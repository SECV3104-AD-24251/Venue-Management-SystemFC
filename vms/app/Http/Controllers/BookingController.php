<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        // Fetch all bookings from the database and eager load the 'venue' relationship
        $bookings = Booking::with('venue')->get();  // Eager load the venue relationship

        // Return the booking data to the view
        return Inertia::render('ViewBooking', [
            'bookings' => $bookings,  // Pass bookings data to the frontend
            'errors' => ['error' => 'This venue is already booked!'],
        ]);
    }

    public function store(Request $request)
    {
    // Validate the incoming request
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'capacity' => 'required|integer',
        'venue_id' => 'required|exists:venues,id',
        'date' => 'required|date',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time', // Ensure end_time is after start_time
        'comments' => 'nullable|string',
    ]);

        // Check if the venue is already booked for the selected date and time
        $existingBooking = Booking::where('venue_id', $request->venue_id)
            ->where('date', $request->date)
            ->where('start_time', $request->start_time)
            ->where('end_time', $request->end_time)
            ->exists();

        if ($existingBooking) {
            // Return an error if the venue is already booked for the selected time
            return back()->withErrors(['error' => 'This venue is already booked for the selected time and date.']);
        }

        // Create the booking entry in the database
        Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'capacity' => $request->capacity,
            'venue_id' => $request->venue_id,
            'date' => $request->date,
            'start_time' => $request->start_time, // Ensure this is passed
            'end_time' => $request->end_time,     // Ensure this is passed
            'comments' => $request->comments,
        ]);

        return back()->with('success', 'Booking successful!');
    }
}
