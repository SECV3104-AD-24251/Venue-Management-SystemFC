<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all(['id', 'name', 'location', 'capacity', 'status']);

        return response()->json($venues);
    }

    public function show($id)
    {
        $venue = Venue::findOrFail($id);

        return Inertia::render('VenueDetails', ['venue' => $venue]);
    }

    public function create()
    {
        return Inertia::render('VenueManagement/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'required|in:available,unavailable,maintenance',
            'image' => 'nullable|string|max:255',
            'info1' => 'nullable|string|max:255',
            'info2' => 'nullable|string|max:255',
            'info3' => 'nullable|string|max:255',
            'info4' => 'nullable|string|max:255',
        ]);

        Venue::create($validated);

        return redirect()->route('venue-management.index')->with('success', 'Venue created successfully.');
    }

    public function edit(Venue $venue)
    {
        return Inertia::render('VenueManagement/Edit', ['venue' => $venue]);
    }

    public function update(Request $request, Venue $venue)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'status' => 'required|in:available,unavailable,maintenance',
            'image' => 'nullable|string|max:255',
            'info1' => 'nullable|string|max:255',
            'info2' => 'nullable|string|max:255',
            'info3' => 'nullable|string|max:255',
            'info4' => 'nullable|string|max:255',
        ]);

        $venue->update($validated);

        return redirect()->route('venue-management.index')->with('success', 'Venue updated successfully.');
    }

    public function destroy(Venue $venue)
    {
        if ($venue->bookings()->exists()) {
            return redirect()->route('venue-management.index')->with('error', 'Cannot delete venue with existing bookings.');
        }

        $venue->delete();

        return redirect()->route('venue-management.index')->with('success', 'Venue deleted successfully.');
    }

    public function adminIndex()
    {
        $venues = Venue::withCount(['bookings', 'maintenances'])
            ->orderBy('name')
            ->get();

        return Inertia::render('VenueManagement/Index', ['venues' => $venues]);
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
