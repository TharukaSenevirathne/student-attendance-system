<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class AuthController
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $key = strtolower($request->email) . '|' . $request->ip();   //new thing learned(create a key with email + ip address)
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
        return response()->json([
            'message' => 'Too many login attempts. Please try again later.',
            'retry_after' => $seconds,
        ], 429);  //429-too many requests
        }

        if (!Auth::attempt($credentials)) {RateLimiter::hit($key, 60);  //counter lasts for 60 seconds
        return response()->json([
            'message' => 'Invalid email or password'
        ], 401);
        }

        return response()->json(['message' => 'Login successful']);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return response()->json(['message' => 'Logout successful']);
    }
}