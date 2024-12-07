<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    
    public function index(): Response
    {
        // Return the booking page with Inertia
        return Inertia::render('Booking', [
            // Pass any data here if needed
        ]);
    }
    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'capacity' => 'required|integer',
        'venue_id' => 'required|exists:venues,id',
        'date' => 'required|date',
        'time' => 'required',
        'comments' => 'nullable|string',
    ]);

    Booking::create([
        'name' => $request->name,
        'email' => $request->email,
        'capacity' => $request->capacity, 
        'venue_id' => $request->venue_id,
        'date' => $request->date,
        'time' => $request->time,
        'comments' => $request->comments,
    ]);

    Booking::create($validated);

    return back()->with('success', 'Booking successful!');
}

}
