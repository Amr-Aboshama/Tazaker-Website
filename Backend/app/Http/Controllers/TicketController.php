<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Stadium;
use App\Models\Ticket;
use Carbon\Carbon;
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

    public function cancelTicket(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'ticket_id' => ['required', 'integer', 'exists:tickets,id']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $user = Auth::user();

        $ticket_data = Ticket::getTicketUserAndMatchId($request->ticket_id);
        $match_date = Matches::getMatchDate($ticket_data->match_id);


        $match_date = Carbon::parse($match_date);
        $current_date = Carbon::now();
        $diff = $match_date->diffInDays($current_date);
        $futureMatch = $current_date->isBefore($match_date);

        if (!$futureMatch || $diff < 3 || $ticket_data->username != $user->username) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $ticket = Ticket::deleteTicket($request->ticket_id);

        return response()->json([
            'success' => true,
            'message' => 'Ticket is deleted successfully',
        ], 200);

    }
}
