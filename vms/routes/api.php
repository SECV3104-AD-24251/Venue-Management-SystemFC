<?php

use App\Http\Controllers\VenueController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\VenueReportController;
use App\Models\User;

Route::get('/reports/venue', [VenueReportController::class, 'index']);

Route::get('/refresh-csrf', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::put('/maintenance/{id}', [MaintenanceController::class, 'updateStatus']);
Route::get('/maintenance/{id}/report', [MaintenanceController::class, 'generateReport']);
Route::get('/admin/maintenance-monitor', [MaintenanceController::class, 'monitor'])->name('admin.maintenance.monitor');

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

