<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Booking;
use App\Models\ClassSchedule;
use App\Models\Venue;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('venue')->get();

        return Inertia::render('ViewBooking', [
            'bookings' => $bookings,
        ]);
    }

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

    public function store(Request $request)
    {
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

        $venue_id = $request->venue_id;
        $date = $request->date;
        $start_time = $request->start_time;
        $end_time = $request->end_time;

        $conflictingBookings = Booking::where('venue_id', $venue_id)
            ->where('date', $date)
            ->where(function ($query) use ($start_time, $end_time) {
                $query->whereBetween('start_time', [$start_time, $end_time])
                      ->orWhereBetween('end_time', [$start_time, $end_time])
                      ->orWhere(function ($query) use ($start_time, $end_time) {
                          $query->where('start_time', '<=', $start_time)
                                ->where('end_time', '>=', $end_time);
                      });
            })
            ->exists();

        if ($conflictingBookings) {
            return back()->withErrors(['error' => 'This venue is already booked for the selected time and date.']);
        }

        Booking::create($validated);

        return back()->with('success', 'Booking successful!');
    }

    public function checkTime(Request $request)
    {
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

        $conflictingBookings = Booking::where('venue_id', $venue_id)
            ->where('date', $date)
            ->where(function ($query) use ($start_time, $end_time) {
                $query->whereBetween('start_time', [$start_time, $end_time])
                      ->orWhereBetween('end_time', [$start_time, $end_time])
                      ->orWhere(function ($query) use ($start_time, $end_time) {
                          $query->where('start_time', '<=', $start_time)
                                ->where('end_time', '>=', $end_time);
                      });
            })
            ->exists();

        return response()->json(['success' => !$conflictingBookings]);
    }

    public function destroy($id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        try {
            $booking->delete();
            return redirect()->back()->with('success', 'Booking deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete booking.');
        }
    }

    public function showSchedule()
    {
        $schedules = ClassSchedule::with('venue')->get();

        return Inertia::render('Schedule', [
            'schedules' => $schedules,
        ]);
    }

    public function edit($id)
    {
        $booking = Booking::with('venue')->findOrFail($id);
        $venues = Venue::all(); // Get all venues

        return Inertia::render('EditBooking', [
            'booking' => $booking,
            'venues' => $venues, 
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

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
    
}
