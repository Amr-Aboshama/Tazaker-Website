<?php

namespace App\Http\Controllers;

use App\Models\Stadium;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StadiumController extends Controller
{
    public function addStadium(Request $request)
    {
        $valid = Validator::make($request->all(),[
            'name' => ['required', 'string', 'unique:stadia'],
            'width' => ['required', 'numeric'],
            'length' => ['required', 'numeric'],
        ]);


        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $stadium = Stadium::storeStadium(
            $request->name,
            $request->width,
            $request->length
        );

        return response()->json([
            'success' => true,
            'stadium' => $stadium,
        ], 200);

    }

    public function viewStadiums(Request $request)
    {
        $stadiums = Stadium::getStadiums();

        return response()->json([
            'success' => true,
            'stadiums' => $stadiums,
        ], 200);
    }
}
