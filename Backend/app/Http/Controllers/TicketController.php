<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use App\Models\Stadium;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    public function viewSeatsDetails(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'match_id' => ['required', 'exists:matches,id'],
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
}
