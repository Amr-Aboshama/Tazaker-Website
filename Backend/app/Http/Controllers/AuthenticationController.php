<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticationController extends Controller
{
    public function signIn(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:4'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $credentials = ['username' => $request->username, 'password' => $request->password];

        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'error' => 'Username and password is not matching.',
            ], 402);
        }

        $user = Auth::user();
        if ($user->role == 'Manager' && $user->approved == 0) {
            Auth::logout();
            return response()->json([
                'success' => false,
                'error' => 'Your account has not been approved as a Manager yet.',
            ], 402);
        }

        $response = [
            'success' => true,
            'token' => $token,
            'role' => $user->role,
        ];

        if ($user->role == 'Manager')
            $response['approved'] = $user->approved;

        return response()->json(
            $response,
            200
        );
    }

    public function signUp(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'username' => ['required', 'alpha_num', 'unique:users', 'min:4'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
            'first_name' => ['required', 'alpha_dash'],
            'last_name' => ['required', 'alpha_dash'],
            'birthdate' => ['required', 'date_format:Y-m-d', 'after:1-1-1920', 'before:1-1-2017'],
            'gender' => ['required', Rule::in(['M', 'F'])],
            'city' => ['required', 'string'],
            'role' => ['required', Rule::in('Manager', 'Fan')],
        ]);


        if ($valid->fails()) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid or some data missed',
            ], 422);
        }


        $user = User::storeUser([
            'username' => $request->username,
            'password' => $request->password,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'birthdate' => $request->birthdate,
            'gender' => $request->gender,
            'city' => $request->city,
            'role' => $request->role,
            'address' => $request->address
        ]);
        $token = Auth::login($user);

        $response = [
            'success' => true,
            'token' => $token,
            'role' => $user->role,
        ];

        if ($user->role == 'Manager')
            $response['approved'] = $user->approved;

        return response()->json($response, 200);
    }

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
