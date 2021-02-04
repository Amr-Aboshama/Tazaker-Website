<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    //

    public function showNonApprovedManagers(Request $request){
        $managers = User::getNonApprovedManagers();

        return response()->json([
            'success' => true,
            'managers' => $managers
        ],200);

    }

    public function approveOrDisapproveManagers(Request $request){
        if (!$request->has('usernames')) {
            return response()->json([
                'success' => 'false',
                'error' => 'usernames is required',
            ], 422);
        }


        $valid = Validator::make($request->all(), [
            'approve' => ['required','boolean']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'approved is required',
            ], 422);
        }

        $managers = $request->usernames;
        $approve = $request->approve;
        $approvedManagers = array();
        foreach ($managers as  $manager) {
            if(User::userExist($manager)&& !User::isApproved($manager)){
                array_push($approvedManagers,$manager);
                if($approve){
                    User::ApproveManager($manager);
                }
            }
        }
        return response()->json([
            'success' => true,
            'approved_managers' => $approvedManagers
        ],200);


    }

    public function showAllUsers(Request $request){
        //$user = Auth::user();

    }

    public function removeUsers(Request $request){
        //$user = Auth::user();

    }


}
