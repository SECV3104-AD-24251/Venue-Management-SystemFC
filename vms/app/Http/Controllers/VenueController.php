<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use App\Events\VenueUpdated;
use Illuminate\Http\Request;

class VenueController extends Controller
{
    public function update(Request $request, $id)
    {
        $venue = Venue::findOrFail($id);
        $venue->update($request->all());

        // Trigger the event
        event(new VenueUpdated($venue));

        return response()->json(['message' => 'Venue updated successfully.']);
    }
}
Route::put('/venues/{id}', [VenueController::class, 'update']);

