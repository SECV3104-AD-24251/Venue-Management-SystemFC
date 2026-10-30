<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VenueReportController extends Controller
{
    public function index()
    {
        return Inertia::render('VenueReports', $this->reportData());
    }

    public function data()
    {
        return response()->json($this->reportData());
    }

    private function reportData(): array
    {
        $venues = Venue::query()
            ->withCount('bookings')
            ->withCount('maintenances')
            ->withCount([
                'maintenances as completed_maintenance' => fn ($query) => $query->where('status', 'completed'),
            ])
            ->orderBy('name')
            ->get(['id', 'name', 'location', 'capacity', 'status']);

        $mostUsedVenues = $venues
            ->map(fn (Venue $venue) => [
                'venue_id' => $venue->id,
                'venue_name' => $venue->name,
                'location' => $venue->location,
                'total_bookings' => (int) $venue->bookings_count,
            ])
            ->sortByDesc('total_bookings')
            ->values();

        $mostMaintainedVenues = $venues
            ->map(fn (Venue $venue) => [
                'venue_id' => $venue->id,
                'venue_name' => $venue->name,
                'location' => $venue->location,
                'total_maintenance' => (int) $venue->maintenances_count,
            ])
            ->sortByDesc('total_maintenance')
            ->values();

        $maintenanceCompletion = $venues->map(function (Venue $venue) {
            $totalTasks = (int) $venue->maintenances_count;
            $completedTasks = (int) $venue->completed_maintenance;

            return [
                'venue_id' => $venue->id,
                'venue_name' => $venue->name,
                'location' => $venue->location,
                'completed_maintenance' => $completedTasks,
                'total_tasks' => $totalTasks,
                'completion_rate' => $totalTasks > 0
                    ? round(($completedTasks / $totalTasks) * 100, 2)
                    : 0,
            ];
        });

        $venueUtilization = DB::table('bookings')
            ->join('venues', 'bookings.venue_id', '=', 'venues.id')
            ->select(
                'venues.id AS venue_id',
                'venues.name AS venue_name',
                'venues.location',
                DB::raw('SUM(TIMESTAMPDIFF(SECOND, bookings.start_time, bookings.end_time) / 3600) AS total_hours_booked')
            )
            ->groupBy('venues.id', 'venues.name', 'venues.location')
            ->orderByDesc('total_hours_booked')
            ->get()
            ->map(fn ($venue) => [
                'venue_id' => (int) $venue->venue_id,
                'venue_name' => $venue->venue_name,
                'location' => $venue->location,
                'total_hours_booked' => (float) $venue->total_hours_booked,
            ]);

        return [
            'summary' => [
                'totalVenues' => $venues->count(),
                'totalBookings' => (int) $venues->sum('bookings_count'),
                'totalMaintenance' => (int) $venues->sum('maintenances_count'),
                'completedMaintenance' => (int) $venues->sum('completed_maintenance'),
            ],
            'mostUsedVenues' => $mostUsedVenues,
            'mostMaintainedVenues' => $mostMaintainedVenues,
            'maintenanceCompletion' => $maintenanceCompletion,
            'venueUtilization' => $venueUtilization,
        ];
    }

    public function bookingsSummary()
    {
        $summary = DB::table('bookings')
            ->selectRaw(
                'COUNT(*) AS total, SUM(CASE WHEN status = \'approved\' THEN 1 ELSE 0 END) AS approved, SUM(CASE WHEN status = \'pending\' THEN 1 ELSE 0 END) AS pending, SUM(CASE WHEN status = \'rejected\' THEN 1 ELSE 0 END) AS rejected, SUM(CASE WHEN status = \'expired\' THEN 1 ELSE 0 END) AS expired',
            )
            ->first();

        return response()->json([
            'summary' => [
                'total' => (int) $summary->total,
                'approved' => (int) $summary->approved,
                'pending' => (int) $summary->pending,
                'rejected' => (int) $summary->rejected,
                'expired' => (int) $summary->expired,
            ],
        ]);
    }

    public function maintenancesSummary()
    {
        $summary = DB::table('maintenances')
            ->selectRaw(
                'COUNT(*) AS total, SUM(CASE WHEN status = \'scheduled\' THEN 1 ELSE 0 END) AS scheduled, SUM(CASE WHEN status = \'in-progress\' THEN 1 ELSE 0 END) AS in_progress, SUM(CASE WHEN status = \'completed\' THEN 1 ELSE 0 END) AS completed',
            )
            ->first();

        return response()->json([
            'summary' => [
                'total' => (int) $summary->total,
                'scheduled' => (int) $summary->scheduled,
                'in_progress' => (int) $summary->in_progress,
                'completed' => (int) $summary->completed,
            ],
        ]);
    }
}
