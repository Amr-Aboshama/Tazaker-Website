<?php

namespace App\Http\Controllers;

use App\Models\Matches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class MatchController extends Controller
{
    /* Deprecated
     *
     *
        public function viewMatchDetails(Request $request)
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

            $match = Matches::getMatchDetails($request->match_id);

            return response()->json([
                'success' => true,
                'match' => $match,
            ], 200);
        }
    */

    public function viewMatches(Request $request)
    {
        if ($request->has('match_id')) {
            $valid = Validator::make($request->all(), [
                'match_id' => ['integer', 'exists:matches,id'],
            ]);

            if ($valid->fails()) {
                return response()->json([
                    'success' => false,
                    'error' => 'Invalid or some data missed',
                ], 422);
            }
            $matches = Matches::getMatchDetails($request->match_id);
        } else {
            $matches = Matches::getMatches();
        }


        return response()->json([
            'success' => true,
            'matches' => $matches,
        ]);
    }

    public function createMatch(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'home_team' => ['required', 'string', 'min:3'],
            'away_team' => ['required', 'string', 'min:3', Rule::notIn($request->home_team)],
            'match_venue' => ['required', 'string', 'exists:stadia,name'],
            'date' => ['required', 'date_format:Y-m-d', 'after:today'],
            'time' => ['required', 'date_format:H:i'],
            'main_referee' => ['required', 'string'],
            'first_linesman' => ['required', 'string'],
            'second_linesman' => ['required', 'string'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $match = Matches::storeMatch([
            'home_team' => $request->home_team,
            'away_team' => $request->away_team,
            'match_venue' => $request->match_venue,
            'date' => $request->date,
            'time' => $request->time,
            'main_referee' => $request->main_referee,
            'first_linesman' => $request->first_linesman,
            'second_linesman' => $request->second_linesman,
        ]);

        return response()->json([
            'success' => true,
            'match_id' => $match->id,
        ]);
    }

    public function editMatch(Request $request){
        $valid = Validator::make($request->all(), [
            'match_id' => ['required','integer', 'exists:matches,id'],
            'home_team' => ['required', 'string', 'min:3'],
            'away_team' => ['required', 'string', 'min:3', Rule::notIn($request->home_team)],
            'match_venue' => ['required', 'string', 'exists:stadia,name'],
            'date' => ['required', 'date_format:Y-m-d', 'after:today'],
            'time' => ['required', 'date_format:H:i'],
            'main_referee' => ['required', 'string'],
            'first_linesman' => ['required', 'string'],
            'second_linesman' => ['required', 'string'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        try{
            $update = Matches::updateMatch($request->match_id,$request->home_team,$request->away_team,
                                            $request->match_venue,$request->date,$request->time,
                                            $request->main_referee,$request->first_linesman,$request->second_linesman);
            return response()->json([
                'success' => true,
                'message' => 'match was edited successfully.'

            ],200);

        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'error' => 'Faild to edit match!'
            ],409);
        }


    }
}
