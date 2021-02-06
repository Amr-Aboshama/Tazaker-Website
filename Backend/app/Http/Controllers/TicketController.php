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

        /*
         * Deprecated
         *
            if(Auth::check())
            {
                $user = Auth::user();
                if($user->role == 'Manager' && $user->approved)
                    $tickets = Ticket::getReservedTicketsByMatchIDForManager($request->match_id);
            }
        */

        $stadium = Matches::getMatchStadium($request->match_id);

        $stadium_shape = Stadium::getStadiumShape($stadium);

        return response()->json([
            'success' => true,
            'length' => $stadium_shape->row_count,
            'width' => $stadium_shape->column_count,
            'reserved_seats' => $tickets,
        ], 200);
    }

    public function reserveTicket(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'match_id' => ['required', 'exists:matches,id']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }



        $stadium = Matches::getMatchStadium($request->match_id);
        $stadium_shape = Stadium::getStadiumShape($stadium);

        $valid = Validator::make($request->all(), [
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

        if ($valid->fails() || Ticket::isSeatReserved($request->match_id, $request->seat_row, $request->seat_column)) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $user = Auth::user();

        $ticket = Ticket::storeTicket([
            'username' => $user->username,
            'match_id' => $request->match_id,
            'seat_row' => $request->seat_row,
            'seat_column' => $request->seat_column,
        ]);


        return response()->json([
            'success' => true,
            'ticket' => $ticket,
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


        $match_date = Carbon::parse($match_date->date . $match_date->time);
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

    public function viewFutureTickets(Request $request)
    {
        $user = Auth::user();

        $tickets = Ticket::getUserTickets($user->username);
        $future_tickets = array();
        foreach ($tickets as $ticket) {
            $match_date = Matches::getMatchDate($ticket->match_id);
            $match_date = Carbon::parse($match_date->date . $match_date->time);
            if ($match_date->isBefore(Carbon::now()))
                continue;

            array_push($future_tickets, $ticket);
        }

        return response()->json([
            'success' => true,
            'future_tickets' => $future_tickets,
        ], 200);
    }
}
