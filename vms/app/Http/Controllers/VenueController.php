<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all();  // Fetch all venues from the database
        return view('venues.index', compact('venues'));  // Return the data as JSON
    }
    
}
