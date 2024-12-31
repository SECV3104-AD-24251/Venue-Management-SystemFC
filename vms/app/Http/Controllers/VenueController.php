<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index()
{
    $venues = Venue::all(); (['id', 'name', 'location', 'capacity', 'status']);// Fetch all venues from the database
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
    $isBooked = Booking::where('venue_id', $validated['venue_id'])
        ->where('date', $validated['date'])
        ->where(function ($query) use ($validated) {
            $query->whereBetween('start_time', [$validated['start_time'], $validated['end_time']])
                  ->orWhereBetween('end_time', [$validated['start_time'], $validated['end_time']])
                  ->orWhere(function ($subQuery) use ($validated) {
                      $subQuery->where('start_time', '<=', $validated['start_time'])
                               ->where('end_time', '>=', $validated['end_time']);
                  });
        })
        ->exists();

    $status = $isBooked ? 'Not Available' : 'Available';

    return response()->json([
        'venue_id' => $validated['venue_id'],
        'status' => $status,
    ]);
}
public function checkAvailability(Request $request)
{
    $available = Venue::whereDoesntHave('bookings', function ($query) use ($request) {
        $query->where('date', $request->date)
              ->where('start_time', '<', $request->end_time)
              ->where('end_time', '>', $request->start_time);
    })->get();

    return response()->json($available);
}



}
