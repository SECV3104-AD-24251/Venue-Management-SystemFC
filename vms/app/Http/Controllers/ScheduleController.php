<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'section' => 'required|integer|min:1',
            'day' => 'required|string|max:50',
            'time' => 'required',
            'duration' => 'required|integer|min:1',
            'capacity' => 'required|integer|min:1',
            'classroom_id' => 'required|exists:classrooms,id',
            'lecturer_id' => 'required|exists:users,id',
        ]);

        Schedule::create($request->all());

        return response()->json(['message' => 'Schedule added successfully!'], 201);
    }
}
