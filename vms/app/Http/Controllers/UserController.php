<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function getLecturers()
    {
        $lecturers = User::where('level', '3')->get(['id', 'name']);
        //return response()->json($lecturers);
    }
}
