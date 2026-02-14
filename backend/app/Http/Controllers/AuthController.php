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

        if (! $token = auth()->attempt($credentail)) {
            return response()->json(['error' => 'Username or Password is incorrect'], 401);
        }
        $user = auth()->user();
        $token = auth()->claims([
            'email' => $user->email,
            'role' => $user->role,
            'name' => $user->name
        ])->fromUser($user);
        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
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
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}
