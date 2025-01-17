<?php
use App\Http\Controllers\VenueController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use App\Models\Venue;
use App\Models\Booking;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\MaintenanceController;

Route::get('/venue-reports', function () {
    return Inertia::render('VenueReports'); // Match this with your React component name
})->name('venue.reports');

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
});

Route::middleware(['auth', 'role:lecturer'])->group(function () {
    Route::get('/lecturer', [LecturerController::class, 'index'])->name('lecturer.index');
});

Route::middleware(['auth', 'role:staff'])->group(function () {
    Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
    Route::get('/maintenance/create', [MaintenanceController::class, 'create'])->name('maintenance.create');
    Route::post('/maintenance', [MaintenanceController::class, 'store'])->name('maintenance.store');
    Route::get('/maintenance/{id}', [MaintenanceController::class, 'show'])->name('maintenance.show');
    Route::post('/maintenance/{id}/status', [MaintenanceController::class, 'updateStatus'])->name('maintenance.updateStatus');
    Route::delete('/maintenances/{maintenance}', [MaintenanceController::class, 'destroy'])->name('maintenance.destroy');
    Route::get('/api/maintenance/{id}', [MaintenanceController::class, 'show']);
    Route::get('/api/maintenance/{id}', [MaintenanceController::class, 'updateStatus']);
    Route::put('/api/maintenance/{id}', [MaintenanceController::class, 'updateStatus']);
    Route::put('/maintenance/{id}/status', [MaintenanceController::class, 'updateStatus']);
    Route::get('/maintenance/{id}/status', [MaintenanceController::class, 'updateStatus']);

});
Route::get('/schedules/add', function () {
    return Inertia::render('AddSchedule');
})->name('schedules.add');

Route::get('/refresh-csrf', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});


Route::get('/venue', function () {
    return Inertia::render('Venue');
})->name('venue');

Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');

Route::get('/viewbooking', function () {
    return Inertia::render('ViewBooking');
})->name('viewbooking');

Route::get('/form', function () {
    return Inertia::render('Form');
})->name('form');

Route::get('/class', function () {
    return Inertia::render('ClassSchedule');
})->name('schedule');

// route to count of total rooms
Route::get('/api/rooms/count', function () {
    return response()->json([
        'totalRooms' => App\Models\Venue::count(),
    ]);
});

// route to count of total bookings
Route::get('/api/bookings/count', function () {
    $totalBookings = App\Models\Booking::count();
    \Log::info('Total bookings count:', ['count' => $totalBookings]); // Log for debugging
    return response()->json(['totalBookings' => $totalBookings]);
});

//schedule
Route::get('/schedule', [ClassScheduleController::class, 'index']);

Route::post('/classroom-suggestions', [BookingController::class, 'getSuggestions']);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/venues/status', [VenueController::class, 'checkVenueStatus']);

Route::get('/api/venues', [VenueController::class, 'index']);

Route::get('/venues/{id}', [VenueController::class, 'show'])->name('venues.show');

Route::get('/viewbooking', [BookingController::class, 'index'])->name('viewbooking');

// Routes for bookings
Route::middleware('auth')->group(function () {
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
});

Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');
Route::get('/schedules/create', [ScheduleController::class, 'create'])->name('schedules.create');


Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

Route::post('/api/bookings/check-time', [BookingController::class, 'checkTime']);

Route::delete('/bookings/{id}', [BookingController::class, 'destroy'])->name('bookings.destroy');

Route::post('/api/venues/check-availability', [VenueController::class, 'checkAvailability']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//editing bookings
Route::get('/bookings/{id}/edit', [BookingController::class, 'edit'])->name('bookings.edit');
Route::patch('/bookings/{id}', [BookingController::class, 'update'])->name('bookings.update');

Route::get('/api/maintenance/{id}', [MaintenanceController::class, 'show']);
Route::get('/api/maintenance/{id}', [MaintenanceController::class, 'updateStatus']);
Route::put('/api/maintenance/{id}', [MaintenanceController::class, 'updateStatus']);

Route::get('/api/notifications', [BookingController::class, 'getNotifications']);
Route::get('/maintenance/{id}/report', [MaintenanceController::class, 'generateReport']);
Route::get('/admin/maintenance-monitor', [MaintenanceController::class, 'monitor'])->name('admin.maintenance.monitor');

require __DIR__.'/auth.php';
