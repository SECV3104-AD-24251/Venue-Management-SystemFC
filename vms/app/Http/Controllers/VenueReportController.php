<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VenueReportController extends Controller
{
    public function index()
    {
        $mostUsedVenues = DB::table('bookings')
            ->join('venues', 'bookings.venue_id', '=', 'venues.id')
            ->select('venues.name AS venue_name', DB::raw('COUNT(bookings.id) AS total_bookings'))
            ->groupBy('venues.id', 'venues.name')
            ->orderByDesc('total_bookings')
            ->get();

        $mostMaintainedVenues = DB::table('maintenances')
            ->join('venues', 'maintenances.venue_id', '=', 'venues.id')
            ->select('venues.name AS venue_name', DB::raw('COUNT(maintenances.id) AS total_maintenance'))
            ->groupBy('venues.id', 'venues.name')
            ->orderByDesc('total_maintenance')
            ->get();

        $maintenanceCompletion = DB::table('maintenances')
            ->join('venues', 'maintenances.venue_id', '=', 'venues.id')
            ->select(
                'venues.name AS venue_name',
                DB::raw("SUM(CASE WHEN maintenances.status = 'completed' THEN 1 ELSE 0 END) AS completed_maintenance"),
                DB::raw('COUNT(maintenances.id) AS total_tasks'),
                DB::raw("ROUND(SUM(CASE WHEN maintenances.status = 'completed' THEN 1 ELSE 0 END) * 100.0 / COUNT(maintenances.id), 2) AS completion_rate")
            )
            ->groupBy('venues.id', 'venues.name')
            ->get();

        $venueUtilization = DB::table('bookings')
            ->join('venues', 'bookings.venue_id', '=', 'venues.id')
            ->select(
                'venues.name AS venue_name',
                DB::raw('SUM(TIMESTAMPDIFF(SECOND, bookings.start_time, bookings.end_time) / 3600) AS total_hours_booked')
            )
            ->groupBy('venues.id', 'venues.name')
            ->orderByDesc('total_hours_booked')
            ->get();

        return Inertia::render('VenueReports', [
            'mostUsedVenues' => $mostUsedVenues,
            'mostMaintainedVenues' => $mostMaintainedVenues,
            'maintenanceCompletion' => $maintenanceCompletion,
            'venueUtilization' => $venueUtilization,
        ]);
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
