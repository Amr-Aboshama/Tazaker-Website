<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        $valid = Validator::make($request->all(), [
            'old_password' => ['Required', 'string', 'min:8'],
            'new_password' => ['Required', 'string', 'confirmed', 'min:8'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $password_match = User::checkIfPasswordRight(
            $user->username,
            $request->old_password
        );

        if (!$password_match) {
            return response()->json([
                'success' => false,
                'error' => 'The current password is incorrect',
            ], 402);
        }

        $user = User::changeUserPassword(
            $user->username,
            $request->new_password
        );

        return response()->json([
            'success' => true,
            'message' => 'Password changed successfully',
        ], 200);
    }
}
