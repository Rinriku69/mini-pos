<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20', 'unique:users,name'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed']
        ]);

        $user = new User();
        $user->email = $request['email'];
        $user->name = $request['name'];
        $user->password = $request['password'];
        $user->role = "USER";
        $user->save();


        return response()->json([
            'status' => 'ok',
            'message' => 'User created Successfully',
            'data' => $user->name
        ], 201);
    }

    function authenticate(Request $request)
    {
        $credentail = $request->validate([
            'name' => ['required', 'string', 'max:20'],
            'password' => ['required', 'string']
        ]);

        if (! $token = auth()->attempt($credential)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
