<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // Dashboard for Admin
        $totalUsers = User::count();
        $totalBookings = Booking::count();

        return Inertia::render('Dashboard', [
            'totalUsers' => $totalUsers,
            'totalBookings' => $totalBookings,
        ]);
    }
}
