<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = Auth::attempt([
            "name" => $request->name,
            "password" => $request->password,
        ]);

        if (!$user) {
            return response()->json([
                "message" => "invalid credentials",
            ], 422);
        }

        $token = auth()->user()->createToken("koentji")->plainTextToken;

        return response()->json([
            "message" => "user logged in succesfully",
            "token" => $token,
            "user" => $user
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "user logged out succesfully"
        ]);
    }
}
