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


Route::get('/venue', function () {
    return Inertia::render('Venue');
})->name('venue');

Route::get('/booking', function () {
    return Inertia::render('Booking');
})->name('booking');

Route::get('/viewbooking', function () {
    return Inertia::render('ViewBooking');
})->name('viewbooking');

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





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/api/venues', [VenueController::class, 'index']);

Route::get('/venues/{id}', [VenueController::class, 'show'])->name('venues.show');

Route::get('/viewbooking', [BookingController::class, 'index'])->name('viewbooking');

// Routes for bookings
Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');

Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

Route::post('/api/bookings/check-time', [BookingController::class, 'checkTime']);

Route::delete('/bookings/{id}', [BookingController::class, 'destroy'])->name('bookings.destroy');



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
