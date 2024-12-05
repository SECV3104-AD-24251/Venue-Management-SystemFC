<?php

// app/Http/Controllers/VenueController.php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function store(Request $request)
    {
        // Create a new Venue instance
        $venue = new Venue();
        $venue->name = 'Auditorium';
        $venue->location = 'Building 2, Floor 1';
        $venue->capacity = 200;

        // Save the venue to the database
        $venue->save();

        // Redirect or return a response
        return redirect()->route('venues.index');  // Redirect to the venue list
    }
    public function index()
    {
        $venues = Venue::all();  // Fetch all venues from the database
        return response()->json($venues);  // Return the data as JSON
    }
    
}
