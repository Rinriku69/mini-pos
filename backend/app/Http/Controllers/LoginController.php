<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required' . 'string', 'max:20'],
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

    /* function authenticate(Request $request){
        $valida
    } */
}
