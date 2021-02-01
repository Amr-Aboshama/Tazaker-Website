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
            'username' => 'required|min:4',
            'password' => 'required|min:8',
        ]);

        if ($valid->fails()) {
            return response()->json([
                'success' => 'false',
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $credentials = ['username' => $request->username, 'password' => $request->password];

        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => 'false',
                'error' => 'username and password is not matching',
            ], 404);
        }

        return response()->json([
            'success' => 'true',
            'token' => $token,
        ], 200);
    }

    public function signUp(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'username' => ['required', 'alpha_num','unique:users','min:4'],
            'email' => ['required','email','unique:users'],
            'password' => ['required','confirmed','min:8'],
            'first_name' => ['required', 'alpha_dash'],
            'last_name' => ['required', 'alpha_dash'],
            'birthdate' => ['required', 'date', 'after:1-1-1920', 'before:1-1-2017'],
            'gender' => ['required', Rule::in(['M', 'F'])],
            'city' => ['required'],
            'role' => ['required', Rule::in('Manager', 'Fan')],
        ]);


        if ($valid->fails()) {
            return response()->json([
                'success' => 'false',
                'error' => 'Invalid or some data missed',
            ], 422);
        }

        $date = Carbon::parse($request->birthdate);

        $user = User::storeUser([
            'username' => $request->username,
            'password' => $request->password,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'birthdate' => $date->format('Y-m-d'),
            'gender' => $request->gender,
            'city' => $request->city,
            'role' => $request->role,
            'address' => $request->address
        ]);
        $token = Auth::login($user);

        return response()->json([
            'success' => 'true',
            'token' => $token,
        ], 200);



        return response()->json([
            'success' => 'true',
            'token' => $token,
        ], 200);
    }


    public function test(Request $request)
    {
        $user = auth()->user();

        if ('' == $request->password || !$request->has('password') ||
            !User::checkIfPasswordRight($user->username, $request->password)) {
            return response()->json([
                'success' => 'false',
                'error' => "password isn't correct",
            ], 403);
        }

        $result = User::deleteAccount($user->username);
        if ($result) {
            return response()->json([
                'success' => 'true',
            ], 200);
        }
    }
}
