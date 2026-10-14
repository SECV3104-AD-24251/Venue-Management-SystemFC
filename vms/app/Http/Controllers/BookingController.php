<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    // Display all bookings with venue details
    public function index()
    {
        $this->authorize('viewAny', Booking::class);

        $bookings = Booking::with('venue')
            ->where('user_id', Auth::id()) // Filter by authenticated user
            ->get();

        return Inertia::render('ViewBooking', [
            'bookings' => $bookings,
        ]);
    }

    // Get filtered venues based on lecture type, equipment, and capacity
    public function getFilteredVenues(Request $request)
    {
        $lectureType = $request->input('lecture_type');
        $requiredEquipment = $request->input('equipment');
        $capacity = $request->input('capacity');

        $venues = Venue::where('capacity', '>=', $capacity)
            ->when($lectureType, function ($query, $lectureType) {
                return $query->where('lecture_type', $lectureType);
            })
            ->when($requiredEquipment, function ($query, $requiredEquipment) {
                return $query->whereJsonContains('equipment', $requiredEquipment);
            })
            ->get();

        return response()->json($venues);
    }

    // Store a new booking in the database
    public function store(Request $request)
    {
        $this->authorize('create', Booking::class);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'capacity' => 'required|integer|min:1',
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'comments' => 'nullable|string',
        ]);

        // Check for booking conflicts
        $conflictingBookings = Booking::conflicts($request->venue_id, $request->date, $request->start_time, $request->end_time)
            ->get();

        // Create the booking
        Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'capacity' => $request->capacity,
            'venue_id' => $request->venue_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'comments' => $request->comments,
            'user_id' => Auth::id(),
        ]);

        // Return JSON for API requests
        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'message' => 'Booking successful!']);
        }

        // Redirect for Inertia requests
        return redirect()->back()->with('success', 'Booking successful!');
    }

    // Check for time conflicts in venue bookings
    public function checkTime(Request $request)
    {
        $this->authorize('create', Booking::class);

        $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $venue_id = $request->venue_id;
        $date = $request->date;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $conflictingBookings = Booking::conflicts($venue_id, $date, $start_time, $end_time)
            ->exists();

        // Return JSON for API requests
        if ($request->wantsJson()) {
            return response()->json(['success' => ! $conflictingBookings]);
        }

        // Handle Inertia requests gracefully (optional if Inertia isn't needed here)
        return redirect()->back()->with('conflict', $conflictingBookings ? 'Conflict exists!' : 'No conflict');
    }

    // Delete a booking by ID
    public function destroy($id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        $this->authorize('delete', $booking);

        try {
            $booking->delete();

            return redirect()->back()->with('success', 'Booking deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete booking.');
        }
    }

    // Display the class schedule with venue details
    public function showSchedule()
    {
        $schedules = ClassSchedule::with('venue')->get();

        return Inertia::render('Schedule', [
            'schedules' => $schedules,
        ]);
    }

    // Edit a booking by ID
    public function edit($id)
    {
        $booking = Booking::with('venue')->findOrFail($id);

        $this->authorize('view', $booking);

        $venues = Venue::all(); // Get all venues

        return Inertia::render('EditBooking', [
            'booking' => $booking,
            'venues' => $venues,
        ]);
    }

    // Update an existing booking
    public function update(Request $request, $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        $this->authorize('update', $booking);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'capacity' => 'required|integer',
            'venue_id' => 'required|exists:venues,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'comments' => 'nullable|string',
        ]);

        $booking->update($validated);

        return redirect()->route('bookings.index')->with('success', 'Booking updated successfully!');
    }

    // Suggest available classrooms based on booking requirements
    public function getSuggestions(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'startTime' => 'required',
            'endTime' => 'required',
            'classSize' => 'required|integer',
            'equipment' => 'array',
            'specialRequirements' => 'string|nullable',
        ]);

        $availableClassrooms = Venue::where('capacity', '>=', $validated['classSize'])
            ->whereDoesntHave('bookings', function ($query) use ($validated) {
                $query->where('date', $validated['date'])
                    ->whereBetween('time', [$validated['startTime'], $validated['endTime']]);
            })
            ->whereDoesntHave('maintenances', function ($query) use ($validated) {
                $query->where('scheduled_for_date', $validated['date'])
                    ->where(function ($query) use ($validated) {
                        $query->whereNull('scheduled_for_time')
                            ->orWhereBetween('scheduled_for_time', [$validated['startTime'], $validated['endTime']]);
                    });
            })
            ->where(function ($query) use ($validated) {
                foreach ($validated['equipment'] as $equipment) {
                    $query->whereJsonContains('equipment', $equipment);
                }
            })
            ->get();

        return response()->json($availableClassrooms);
    }

    // Fetch recent booking notifications
    public function getNotifications()
    {
        $notifications = Booking::with('venue')
            ->orderBy('created_at', 'desc')
            ->take(5) // Fetch the 5 most recent bookings
            ->get()
            ->map(function ($booking) {
                return [
                    'message' => "Booking for {$booking->venue->name} on {$booking->date} from {$booking->start_time} to {$booking->end_time}.",
                ];
            });

        return response()->json(['notifications' => $notifications]);
    }
}
