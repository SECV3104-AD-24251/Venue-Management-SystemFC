<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Maintenance;
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
        $validated = $request->validate([
            'class_name' => 'required|string|max:255',
            'section' => 'required|string|max:50',
            'lecturer_name' => 'required|string|max:255',
            'day' => 'required|in:Monday,Tuesday,Wednesday,Thursday,Friday',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'venue_id' => 'required|exists:venues,id',
        ]);

        $conflict = Schedule::where('venue_id', $validated['venue_id'])
            ->where('day', $validated['day'])
            ->where('start_time', '<', $validated['end_time'])
            ->where('end_time', '>', $validated['start_time'])
            ->exists();

        if ($conflict) {
            return redirect()->back()
                ->withErrors(['venue_id' => 'Venue already has a schedule at this time on this day.'])
                ->withInput();
        }

        $bookingConflict = Booking::where('venue_id', $validated['venue_id'])
            ->whereRaw('DAYNAME(`date`) = ?', [$validated['day']])
            ->where('start_time', '<', $validated['end_time'])
            ->where('end_time', '>', $validated['start_time'])
            ->exists();

        if ($bookingConflict) {
            return redirect()->back()
                ->withErrors(['venue_id' => 'Venue has existing bookings at this time on this day.'])
                ->withInput();
        }

        $maintenanceConflict = Maintenance::where('venue_id', $validated['venue_id'])
            ->whereRaw('DAYNAME(`scheduled_for_date`) = ?', [$validated['day']])
            ->where(function ($query) use ($validated) {
                $query->whereNull('scheduled_for_time')
                    ->orWhere(function ($q) use ($validated) {
                        $q->where('scheduled_for_time', '<', $validated['end_time'])
                            ->where('scheduled_for_time', '>', $validated['start_time']);
                    });
            })
            ->exists();

        if ($maintenanceConflict) {
            return redirect()->back()
                ->withErrors(['venue_id' => 'Venue has maintenance scheduled at this time on this day.'])
                ->withInput();
        }

        Schedule::create($validated);

        return redirect()->route('schedules.add')->with('success', 'Schedule created successfully.');
    }
}
