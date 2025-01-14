<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::with('venue')->get();
        return Inertia::render('Maintenance/Index', [
            'maintenances' => $maintenances
        ]);
    }

    public function create()
    {
        $venues = Venue::all();
        return inertia('Maintenance/Create', [
            'venues' => $venues,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'description' => 'required|string',
            'scheduled_for_date' => 'required|date',
            'scheduled_for_time' => 'required|string',
        ]);

        $validated['description'] = $validated['description'] ?? 'No description provided';

        $maintenance = Maintenance::create([
            'venue_id' => $validated['venue_id'],
            'description' => $validated['description'],
            'scheduled_for_date' => $validated['scheduled_for_date'],
            'scheduled_for_time' => $validated['scheduled_for_time'],
            'status' => 'scheduled', // Default value
        ]);

        return redirect()->route('maintenance.index');
    }

    public function show($id)
    {
        $maintenance = Maintenance::with('venue')->findOrFail($id);
        return inertia('Maintenance/Show', ['maintenance' => $maintenance]);
    }

    public function updateStatus(Request $request, $id)
    {
        $maintenance = Maintenance::findOrFail($id);
        $maintenance->update(['status' => $request->status]);
        return redirect()->route('maintenance.index');
    }

    public function destroy(Maintenance $maintenance)
{
    $maintenance->delete();
    return response()->json(['success' => true]);
}
    
}

