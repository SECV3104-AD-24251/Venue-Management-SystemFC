<?php

// app/Http/Controllers/VenueController.php

namespace App\Http\Controllers;

use App\Models\Venue;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all();  // Fetch all venues from the database
        return response()->json($venues);  // Return venues as JSON
    }
}

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VenueController;

Route::middleware('api')->get('/venues', function (Request $request) {
    return \App\Models\Venue::all();
});

Route::get('/venues', [VenueController::class, 'index']);

// app/Http/Controllers/VenueController.php


class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all();  // Fetch all venues from the database
        return response()->json($venues);  // Return venues as JSON
    }
}

