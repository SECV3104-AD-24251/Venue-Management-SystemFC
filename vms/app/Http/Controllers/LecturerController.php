<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LecturerController extends Controller
{
    public function index()
    {
        // Dashboard for Lecturer
        return Inertia::render('Dashboard');
    }
}
