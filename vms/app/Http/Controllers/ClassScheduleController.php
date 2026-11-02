<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Venue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with('venue')
            ->where('lecturer_id', auth()->id())
            ->get();

        return Inertia::render('ClassSchedule', [
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'section' => 'required|integer|max:50',
            'day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'venue_id' => 'required|exists:venues,id',
        ]);

        $venueConflict = Schedule::where('venue_id', $validated['venue_id'])
            ->where('day', $validated['day'])
            ->where('start_time', '<', $validated['end_time'])
            ->where('end_time', '>', $validated['start_time'])
            ->exists();

        if ($venueConflict) {
            return back()->withErrors(['venue_id' => 'Venue already has a class scheduled at this time on this day.'])->withInput();
        }

        $lecturerConflict = Schedule::where('lecturer_id', auth()->id())
            ->where('day', $validated['day'])
            ->where('start_time', '<', $validated['end_time'])
            ->where('end_time', '>', $validated['start_time'])
            ->exists();

        if ($lecturerConflict) {
            return back()->withErrors(['lecturer_id' => 'You already have a class scheduled at this time on this day.'])->withInput();
        }

        $lecturer = auth()->user();

        Schedule::create([
            'subject' => $validated['class_name'],
            'section' => $validated['section'],
            'day' => $validated['day'],
            'time' => $validated['start_time'],
            'duration' => Carbon::parse($validated['end_time'])->diffInMinutes(Carbon::parse($validated['start_time'])),
            'capacity' => Venue::find($validated['venue_id'])?->capacity ?? 0,
            'lecturer_id' => $lecturer->id,
            'lecturer_name' => $lecturer->name,
            'venue_id' => $validated['venue_id'],
            'class_name' => $validated['class_name'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        return redirect()->route('lecturer.schedule')->with('success', 'Class schedule added successfully!');
    }
}
