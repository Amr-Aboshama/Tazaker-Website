<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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

    public function editUserInfo(Request $request){
        $valid = Validator::make($request->all(), [
            'first_name' => ['required', 'alpha_dash'],
            'last_name' => ['required', 'alpha_dash'],
            'birthdate' => ['required', 'date_format:Y-m-d', 'after:1-1-1920', 'before:1-1-2017'],
            'gender' => ['required', Rule::in(['M', 'F'])],
            'city' => ['required', 'string'],
            'address' => ['required','nullable']
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        try{
            $username =Auth::user()->username;
            $update = User::updateUserInfo($username,$request->first_name,$request->last_name,
                            $request->birthdate,$request->gender,$request->city,$request->address);
            return response()->json([
                'success' => true,
                'message' => 'user\'s information was edited successfully.'
            ],200);
        } catch(\Exception $e){
            return response()->json([
                'success' => false,
                'error' => 'Faild to edit user\'s information!'
            ],409);
        }
    }

    public function viewUserInfo(Request $request){
        $user = Auth::user();
        try{
            $tickets = Ticket::getUserTickets($user->username);
            return response()->json([
                'success' => true,
                'user'=> [
                    'username' => $user->username,
                    'email' => $user ->email,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'birthdate' =>$user->birthdate,
                    'gender' => $user->gender,
                    'city' =>$user->city,
                    'role'=>$user->role,
                    'address' =>$user->address,
                    'tickets' => $tickets
                ]
            ],200);
        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'error' => 'Faild to get user\'s information!'
            ],409);
        }
    }
}
