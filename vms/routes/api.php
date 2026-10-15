<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueReportController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Venue-related API routes
    Route::apiResource('/venues', VenueController::class);

    // Booking-related API routes
    Route::apiResource('/bookings', BookingController::class);
    Route::post('/bookings/check-time', [BookingController::class, 'checkTime']);
    Route::get('/bookings/notifications', [BookingController::class, 'getNotifications']);

    // Maintenance-related API routes
    Route::apiResource('/maintenances', MaintenanceController::class);
    Route::put('/maintenances/{id}/status', [MaintenanceController::class, 'updateStatus']);
    Route::get('/maintenances/{id}/report', [MaintenanceController::class, 'generateReport']);
    Route::get('/admin/maintenance-monitor', [MaintenanceController::class, 'monitor'])->name('admin.maintenance.monitor');

    // Schedule-related API routes
    Route::apiResource('/schedules', ScheduleController::class);

    // User-related API routes
    Route::get('/lecturers', [UserController::class, 'getLecturers']);

    // Venue availability & suggestions
    Route::post('/venues/check-availability', [VenueController::class, 'checkAvailability']);
    Route::post('/venues/status', [VenueController::class, 'checkVenueStatus']);
    Route::post('/classroom-suggestions', [BookingController::class, 'getSuggestions']);

    // Reports
    Route::get('/reports/venue', [VenueReportController::class, 'index']);
});

Route::get('/refresh-csrf', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

// Notifications endpoint (public for demo)
Route::get('/notifications', function () {
    return response()->json([
        'notifications' => [
            'Your booking for Room A has been confirmed.',
            'Maintenance is scheduled for tomorrow in Building B.',
            'A new venue, Lecture Hall C, has been added to the system.',
        ],
    ]);
});
