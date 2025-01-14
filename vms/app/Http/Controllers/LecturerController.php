<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    public function index()
    {
        // Dashboard for Lecturer
        $bookings = auth()->user()->bookings()->with('venue')->get();

        return view('lecturer.dashboard', compact('bookings'));
    }

    public function manageSchedule()
    {
        // Manage schedule (dummy data for example)
        $schedule = [
            ['course' => 'Math 101', 'time' => '9:00 AM - 10:30 AM', 'venue' => 'Room 5'],
            ['course' => 'Physics 202', 'time' => '11:00 AM - 12:30 PM', 'venue' => 'Room 2'],
        ];

        return view('lecturer.schedule', compact('schedule'));
    }
}

