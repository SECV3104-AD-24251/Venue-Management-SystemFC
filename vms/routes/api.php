<?php

use App\Http\Controllers\VenueController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScheduleController;
use App\Models\User;

Route::post('/schedules', [ScheduleController::class, 'store']);

Route::get('/lecturers', [UserController::class, 'getLecturers']);

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