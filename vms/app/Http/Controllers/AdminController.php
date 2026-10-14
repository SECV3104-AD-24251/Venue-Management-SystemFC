<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        // Dashboard for Admin
        $totalUsers = User::count();
        $totalBookings = Booking::count();

        return view('admin.dashboard', [
            'totalUsers' => $totalUsers,
            'totalBookings' => $totalBookings,
        ]);
    }

    public function manageUsers()
    {
        // Display all users
        $users = User::all();

        return view('admin.users.index', compact('users'));
    }

    public function manageBookings()
    {
        // Display all bookings
        $bookings = Booking::with('user', 'venue')->get();

        return view('admin.bookings.index', compact('bookings'));
    }
}
