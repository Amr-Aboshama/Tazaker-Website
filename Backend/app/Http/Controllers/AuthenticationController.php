<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function signIn(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'username' => ['required', 'alpha_num', 'min:4'],
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


        return response()->json([
            'success' => true,
            'token' => $token,
            'role' => $user->role,
        ], 200);
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

        return response()->json([
            'success' => true,
            'message' => 'The account created successfully!',
        ], 200);
    }

    public function signOut()
    {
        Auth::logout();

        return response()->json([
            'success' => 'true',
        ], 200);
    }
}
