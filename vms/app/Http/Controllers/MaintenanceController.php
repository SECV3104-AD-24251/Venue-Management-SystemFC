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
        $maintenances = Maintenance::with('venue')->latest()->get(); // Fetch latest records

        return Inertia::render('Maintenance/Index', [
            'maintenances' => $maintenances,
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
        $request->validate([
            'status' => 'required|in:scheduled,in-progress,completed',
        ]);

        $maintenance = Maintenance::findOrFail($id);

        if ($request->status === 'completed') {
            $maintenance->completed_at = now(); // Set the completion date
        } else {
            $maintenance->completed_at = null; // Reset the completion date if not completed
        }

        $maintenance->status = $request->status;
        $maintenance->save();

        return response()->json(['success' => true, 'message' => 'Status updated successfully']);
    }

    public function generateReport($id)
    {
        try {
            $maintenance = Maintenance::with('venue')->findOrFail($id);

            // Example PDF generation
            $pdf = \PDF::loadView('reports.maintenance', ['maintenance' => $maintenance]);

            $fileName = "Maintenance_Report_{$maintenance->id}.pdf";

            // Return the generated PDF for download
            return $pdf->download($fileName);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Failed to generate report: ', ['error' => $e->getMessage()]);

            return response()->json(['success' => false, 'message' => 'Report generation failed.'], 500);
        }
    }

    public function destroy($id)
    {
        $maintenance = Maintenance::find($id);

        if (! $maintenance) {
            return response()->json(['success' => false, 'message' => 'Maintenance not found'], 404);
        }

        $maintenance->delete();

        return response()->json(['success' => true]);
    }

    public function monitor()
    {
        $maintenances = Maintenance::with('venue')
            ->orderBy('scheduled_for_date', 'asc')
            ->get(['id', 'description', 'scheduled_for_date', 'status', 'completed_at', 'venue_id']);

        return Inertia::render('Admin/MaintenanceMonitor', [
            'maintenances' => $maintenances,
        ]);
    }

    public function fetchMaintenanceNotifications()
    {
        // Fetch venues that are under maintenance, make sure to replace this query according to your DB schema
        $maintenanceNotifications = Venue::where('is_under_maintenance', true)
            ->with('name') // Assuming there's a 'name' field in the Venue model
            ->get();

        return response()->json([
            'maintenanceNotifications' => $maintenanceNotifications,
        ]);
    }
}
