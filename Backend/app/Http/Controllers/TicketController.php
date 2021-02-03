<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Stadium;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TicketController extends Controller
{
    public function viewSeatsStatus(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'match_id' => ['required', 'integer', 'exists:matches,id'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $tickets = Ticket::getReservedTicketsByMatchID($request->match_id);

        $stadium = Matches::getMatchStadium($request->match_id);

        $stadium_shape = Stadium::getStadiumShape($stadium);

        return response()->json([
            'success' => true,
            'length' => $stadium_shape->row_count,
            'width' => $stadium_shape->column_count,
            'reserved_seats' => $tickets,
        ], 200);
    }

    public function reserveTickets(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'match_id' => ['required', 'exists:matches,id'],
            'seats' => ['required', 'array'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }



        $stadium = Matches::getMatchStadium($request->match_id);
        $stadium_shape = Stadium::getStadiumShape($stadium);

        $user = Auth::user();

        $reserved_tickets = [];

        foreach ($request->seats as $seat) {
            $valid = Validator::make($seat, [
                'seat_row' => [
                    'required',
                    'integer',
                    'gt:0',
                    'lte:' . $stadium_shape->row_count,
                ],
                'seat_column' => [
                    'required',
                    'integer',
                    'gt:0',
                    'lte:' . $stadium_shape->column_count,
                ],
            ]);

            if (
                $valid->fails()
                || Ticket::isSeatReserved($request->match_id, $seat['seat_row'], $seat['seat_column'])
            )
                continue;

            $ticket = Ticket::storeTicket([
                'username' => $user->username,
                'match_id' => $request->match_id,
                'seat_row' => $seat['seat_row'],
                'seat_column' => $seat['seat_column'],
            ]);

            array_push($reserved_tickets, $ticket);
        }


        return response()->json([
            'success' => true,
            'reserved_tickets' => $reserved_tickets,
        ], 200);
    }
}
