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
    $request->validate([
        'venue_id' => 'nullable|exists:venues,id', // Optional: Specific venue check
        'date' => 'required|date', // Date of interest
        'start_time' => 'required|date_format:H:i', // Start time
        'end_time' => 'required|date_format:H:i|after:start_time', // End time (must be after start time)
    ]);

    $venueId = $request->input('venue_id');
    $date = $request->input('date');
    $startTime = $request->input('start_time');
    $endTime = $request->input('end_time');

    // Query for venues without conflicting bookings or maintenance
    $availableVenues = Venue::when($venueId, function ($query) use ($venueId) {
        $query->where('id', $venueId); // Check for a specific venue if ID is provided
    })
    ->whereDoesntHave('bookings', function ($query) use ($date, $startTime, $endTime) {
        $query->where('date', $date)
              ->where('start_time', '<', $endTime)
              ->where('end_time', '>', $startTime);
    })
    ->whereDoesntHave('maintenances', function ($query) use ($date, $startTime, $endTime) {
        $query->where('scheduled_for_date', $date)
              ->where(function ($query) use ($startTime, $endTime) {
                  $query->whereNull('scheduled_for_time') // All-day maintenance
                        ->orWhere(function ($query) use ($startTime, $endTime) {
                            $query->where('scheduled_for_time', '<', $endTime)
                                  ->where('scheduled_for_time', '>', $startTime);
                        });
              });
    })
    ->get();

    // Response format: single venue availability or list of available venues
    if ($venueId) {
        return response()->json([
            'venue_id' => $venueId,
            'available' => $availableVenues->isNotEmpty(),
        ]);
    }

    return response()->json($availableVenues);
}

public function getVenues()
{
    $venues = DB::table('venues')
        ->leftJoin('bookings', 'venues.id', '=', 'bookings.venue_id')
        ->select('venues.name', DB::raw('COUNT(bookings.id) as bookings'))
        ->groupBy('venues.id', 'venues.name')
        ->orderBy('bookings', 'desc')
        ->get();

    return response()->json($venues);
}

public function getAvailableVenues()
{
    try {
        // Fetch the count of available venues
        $availableVenuesCount = Venue::where('status', 'available')->count();

        // Return the count as JSON
        return response()->json(['availableVenues' => $availableVenuesCount]);
    } catch (\Exception $e) {
        // Handle any errors
        return response()->json(['error' => 'Failed to fetch available venues'], 500);
    }
}


}
