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

        $bookings = Booking::where('venue_id', $validated['venue_id'])
            ->where('status', '!=', 'rejected')
            ->get(['date', 'start_time', 'end_time']);

        $bookingConflict = $bookings->contains(function (Booking $booking) use ($validated) {
            return $booking->date->format('l') === $validated['day']
                && $booking->start_time < $validated['end_time']
                && $booking->end_time > $validated['start_time'];
        });

        if ($bookingConflict) {
            return redirect()->back()
                ->withErrors(['venue_id' => 'Venue has existing bookings at this time on this day.'])
                ->withInput();
        }

        $maintenances = Maintenance::where('venue_id', $validated['venue_id'])
            ->whereIn('status', ['scheduled', 'in-progress'])
            ->get(['scheduled_for_date', 'scheduled_for_time', 'status']);

        $maintenanceConflict = $maintenances->contains(function (Maintenance $maintenance) use ($validated) {
            if ($maintenance->status === 'completed') {
                return false;
            }

            if ($maintenance->scheduled_for_date->format('l') !== $validated['day']) {
                return false;
            }

            if ($maintenance->scheduled_for_time === null) {
                return true;
            }

            return $maintenance->scheduled_for_time < $validated['end_time']
                && $maintenance->scheduled_for_time > $validated['start_time'];
        });

        if ($maintenanceConflict) {
            return redirect()->back()
                ->withErrors(['venue_id' => 'Venue has maintenance scheduled at this time on this day.'])
                ->withInput();
        }

        Schedule::create($validated);

        return redirect()->route('schedules.add')->with('success', 'Schedule created successfully.');
    }
}
