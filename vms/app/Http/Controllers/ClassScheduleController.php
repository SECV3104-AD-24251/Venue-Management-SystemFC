<?php

// app/Http/Controllers/ClassScheduleController.php

namespace App\Http\Controllers;

use App\Models\ClassSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassScheduleController extends Controller
{
    public function index()
    {
        // Fetch all class schedules from the database
        $schedules = ClassSchedule::with('venue')->get();
        \Log::info($schedules);

        return Inertia::render('ClassSchedule', [
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'class_name' => 'required|string|max:255',
            'lecturer_name' => 'required|string|max:255',
            'day' => 'required|string',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        ClassSchedule::create($validated);

        return redirect()->route('classSchedules.index')->with('success', 'Class schedule added successfully!');
    }
}
