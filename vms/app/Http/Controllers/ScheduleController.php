<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function create()
{
    return Inertia::render('Schedules/Create');
}

public function store(Request $request)
{
    $request->validate([
        'class_name' => 'required|string|max:255',
        'section' => 'required|string|max:50', // Validate section
        'lecturer_name' => 'required|string|max:255',
        'day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time',
        'venue_id' => 'required|exists:venues,id',
    ]);

    $user = auth()->user();

    Schedule::create($request->all());

    return redirect()->route('schedules.index')->with('success', 'Schedule created successfully.');
}
}
