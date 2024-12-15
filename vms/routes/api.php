<?php

use App\Http\Controllers\VenueController;
use Illuminate\Support\Facades\Route;

// Venue-related API routes
Route::apiResource('/venues', VenueController::class);

// Notifications endpoint
Route::get('/notifications', function () {
    return response()->json([
        'notifications' => [
            'Your booking for Room A has been confirmed.',
            'Maintenance is scheduled for tomorrow in Building B.',
            'A new venue, Lecture Hall C, has been added to the system.',
        ],
    ]);
});