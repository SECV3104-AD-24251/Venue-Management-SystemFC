<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ClassScheduleController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueReportController;
use App\Models\Venue;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/venue-reports', [VenueReportController::class, 'index'])->name('venue-reports');

    Route::get('/maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
    Route::get('/maintenance/create', [MaintenanceController::class, 'create'])->name('maintenance.create');
    Route::post('/maintenance', [MaintenanceController::class, 'store'])->name('maintenance.store');
    Route::get('/maintenance/{id}', [MaintenanceController::class, 'show'])->name('maintenance.show');
    Route::post('/maintenance/{id}/status', [MaintenanceController::class, 'updateStatus'])->name('maintenance.updateStatus');
    Route::delete('/maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenance.destroy');
    Route::get('/maintenance/{id}/report', [MaintenanceController::class, 'generateReport']);
    Route::get('/admin/maintenance-monitor', [MaintenanceController::class, 'monitor'])->name('admin.maintenance.monitor');

    Route::get('/admin/bookings', [BookingController::class, 'adminIndex'])->name('admin.bookings.index');
    Route::patch('/admin/bookings/{id}/approve', [BookingController::class, 'approve'])->name('admin.bookings.approve');
    Route::patch('/admin/bookings/{id}/reject', [BookingController::class, 'reject'])->name('admin.bookings.reject');

    Route::get('/admin/venues', [VenueController::class, 'adminIndex'])->name('venue-management.index');
    Route::get('/admin/venues/create', [VenueController::class, 'create'])->name('venue-management.create');
    Route::post('/admin/venues', [VenueController::class, 'store'])->name('venue-management.store');
    Route::get('/admin/venues/{venue}/edit', [VenueController::class, 'edit'])->name('venue-management.edit');
    Route::patch('/admin/venues/{venue}', [VenueController::class, 'update'])->name('venue-management.update');
    Route::delete('/admin/venues/{venue}', [VenueController::class, 'destroy'])->name('venue-management.destroy');
});

// Lecturer routes - only booking, viewbooking, schedule
Route::middleware(['auth', 'role:lecturer'])->group(function () {
    Route::get('/lecturer', [LecturerController::class, 'index'])->name('lecturer.index');
    Route::get('/booking', function () {
        return Inertia::render('Booking');
    })->name('booking');
    Route::get('/viewbooking', [BookingController::class, 'index'])->name('viewbooking');
    Route::get('/schedule', [ClassScheduleController::class, 'index'])->name('schedule');
    Route::get('/venue', function () {
        return Inertia::render('Venue');
    })->name('venue');

    // Booking routes
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy'])->name('bookings.destroy');
    Route::get('/bookings/{id}/edit', [BookingController::class, 'edit'])->name('bookings.edit');
    Route::patch('/bookings/{id}', [BookingController::class, 'update'])->name('bookings.update');
});

// Staff routes - maintenance and venue reports
Route::middleware(['auth', 'role:staff'])->group(function () {
    Route::get('/maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
    Route::get('/maintenance/create', [MaintenanceController::class, 'create'])->name('maintenance.create');
    Route::post('/maintenance', [MaintenanceController::class, 'store'])->name('maintenance.store');
    Route::get('/maintenance/{id}', [MaintenanceController::class, 'show'])->name('maintenance.show');
    Route::post('/maintenance/{id}/status', [MaintenanceController::class, 'updateStatus'])->name('maintenance.updateStatus');
    Route::delete('/maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenance.destroy');
    Route::get('/maintenance/{id}/report', [MaintenanceController::class, 'generateReport']);
    Route::get('/venue-reports', [VenueReportController::class, 'index'])->name('venue-reports');
});

// Shared authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['verified'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/refresh-csrf', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });

    Route::get('/venue', function () {
        return Inertia::render('Venue');
    })->name('venue');

    // Shared API endpoints for all authenticated users
    Route::get('/api/venues', [VenueController::class, 'index']);
    Route::get('/api/bookings/count', function () {
        return response()->json(['totalBookings' => \App\Models\Booking::count()]);
    });
    Route::get('/api/rooms/count', function () {
        return response()->json(['totalRooms' => \App\Models\Venue::count()]);
    });
    Route::get('/api/notifications', [BookingController::class, 'getNotifications']);
    Route::post('/api/notifications/{id}/read', [BookingController::class, 'markNotificationAsRead']);
    Route::post('/api/notifications/read-all', [BookingController::class, 'markAllNotificationsAsRead']);
    Route::get('/api/notifications/unread-count', [BookingController::class, 'getUnreadCount']);
    Route::post('/api/venues/check-availability', [VenueController::class, 'checkAvailability']);
    Route::post('/api/venues/status', [VenueController::class, 'checkVenueStatus']);
    Route::post('/api/bookings/check-time', [BookingController::class, 'checkTime']);
    Route::post('/classroom-suggestions', [BookingController::class, 'getSuggestions']);
    Route::get('/venues/{id}', [VenueController::class, 'show'])->name('venues.show');
});

// Public pages
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/schedules/add', function () {
    return Inertia::render('AddSchedule');
})->name('schedules.add');

Route::get('/form', function () {
    return Inertia::render('Form');
})->name('form');

Route::get('/class', function () {
    return Inertia::render('ClassSchedule');
})->name('schedule');

require __DIR__.'/auth.php';
