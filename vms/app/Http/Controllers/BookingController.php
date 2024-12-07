<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    
    public function index(): Response
    {
        // Return the booking page with Inertia
        return Inertia::render('Booking', [
            // Pass any data here if needed
        ]);
    }
}
