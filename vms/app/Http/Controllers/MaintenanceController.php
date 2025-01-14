<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Venue;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::with('venue')->get();
        return inertia('Maintenance/Index', ['maintenances' => $maintenances]);
    }

    public function create()
    {
        // Fetch all venues to allow staff to choose a venue for maintenance
        $venues = Venue::all();

        // Return a view to create the maintenance record
        return inertia('Maintenance/Create', [
            'venues' => $venues,
        ]);
    }   

    public function store(Request $request)
    {

        \Log::info('Incoming Request Data:', $request->all());

        $validated = $request->validate([
            'venue_id' => 'required|exists:venues,id',
            'description' => 'required|string',
            'scheduled_for_date' => 'required|date',
            'scheduled_for_time' => 'required|time',
        ]);

        $validated['description'] = $validated['description'] ?? 'No description provided';

        \Log::info('Validated Data:', $validated);

        $maintenance = Maintenance::create([
            'venue_id' => $validated['venue_id'],
            'description' => $validated['description'],
            'scheduled_for_date' => $validated['scheduled_for_date'],
            'scheduled_for_time' => 'required|date_format:H:i',
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
}
