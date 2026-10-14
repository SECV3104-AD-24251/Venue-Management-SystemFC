<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all(['id', 'name', 'location', 'capacity', 'status']); // Fetch all venues from the database

        return response()->json($venues);
    }

    public function show($id)
    {
        $venue = Venue::findOrFail($id); // Find the venue or throw a 404 error

        return inertia('VenueDetails', ['venue' => $venue]);
    }

    public function checkVenueStatus(Request $request)
    {
        $validated = $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        // Check if any bookings exist for the venue and time range
        $isBooked = Booking::conflicts($validated['venue_id'], $validated['date'], $validated['start_time'], $validated['end_time'])
            ->exists();

        $status = $isBooked ? 'Not Available' : 'Available';

        return response()->json([
            'venue_id' => $validated['venue_id'],
            'status' => $status,
        ]);
    }

    public function checkAvailability(Request $request)
    {
        $request->validate([
            'venue_id' => 'nullable|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $venueId = $request->input('venue_id');
        $date = $request->input('date');
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');

        $availableVenues = Venue::when($venueId, function ($query) use ($venueId) {
            $query->where('id', $venueId);
        })
            ->whereDoesntHave('bookings', function ($query) use ($date, $startTime, $endTime) {
                $query->where('date', $date)
                    ->where('start_time', '<', $endTime)
                    ->where('end_time', '>', $startTime);
            })
            ->whereDoesntHave('maintenances', function ($query) use ($date, $startTime, $endTime) {
                $query->where('scheduled_for_date', $date)
                    ->where(function ($query) use ($startTime, $endTime) {
                        $query->whereNull('scheduled_for_time')
                            ->orWhere(function ($query) use ($startTime, $endTime) {
                                $query->where('scheduled_for_time', '<', $endTime)
                                    ->where('scheduled_for_time', '>', $startTime);
                            });
                    });
            })
            ->get();

        if ($venueId) {
            return response()->json([
                'venue_id' => $venueId,
                'available' => $availableVenues->isNotEmpty(),
            ]);
        }

        return response()->json($availableVenues);
    }
}
