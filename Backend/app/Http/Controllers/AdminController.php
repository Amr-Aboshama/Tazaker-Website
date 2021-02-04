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

    public function approveOrDisapproveManagers(Request $request)
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
    }

    public function showAllUsers(Request $request)
    {
        //$user = Auth::user();

    }

    public function removeUsers(Request $request)
    {
        //$user = Auth::user();

    }
}
