<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    function register(Request $request)
    {
        DB::transaction(function () use ($request) {

            $user = new User();
            $user->email = $request['email'];
            $user->name = $request['name'];
            $user->password = $request['password'];
            $user->role = "USER";
            $user->save();
        });

        return response()->json(['status' => 'ok']);
    }
}
