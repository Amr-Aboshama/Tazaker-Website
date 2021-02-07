<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    //

    public function showNonApprovedManagers(Request $request)
    {
        $managers = User::getNonApprovedManagers();

        return response()->json([
            'success' => true,
            'managers' => $managers
        ], 200);
    }

    public function approveOrDisapproveManager(Request $request)
    {

        $valid = Validator::make($request->all(), [
            'username' => ['required', 'string', 'exists:users'],
            'approve' => ['required', 'boolean']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $user = User::getUserWholeRecord($request->username);

        if ($user->role != 'Manager' || $user->approved) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        try {
            $msg = '';
            if ($request->approve) {
                User::ApproveManager($user->username);
                $msg = 'approved';
            } else {
                User::deleteAccount($user->username);
                $msg = 'deleted';
            }
            return response()->json([
                'success' => true,
                'message' => 'Manager is ' . $msg . ' successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to approve/disapprove manager!',
            ], 409);
        }



    }

    public function showAllUsers(Request $request)
    {

        $users = User::getNotAdminUsers();

        return response()->json([
            'success' => true,
            'users' => $users
        ], 200);


    }

    public function removeUser(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'username' => ['required', 'string', 'exists:users']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }



        try {
            $deleted = User::deleteAccount($request->username);
            if($deleted){
                return response()->json([
                    'success' => true,
                    'message' => 'User is removed successfully.'
                ],200);
            }
            else{
                return response()->json([
                    'success' => false,
                    'error' => 'Failed to remove user!'
                ],409);
            }

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to remove user!'
            ],409);
        }

    }
}
