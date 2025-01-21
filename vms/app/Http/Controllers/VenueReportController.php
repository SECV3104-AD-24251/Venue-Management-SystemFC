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
                DB::raw('SUM(CASE WHEN maintenances.status = "completed" THEN 1 ELSE 0 END) AS completed_maintenance'),
                DB::raw('COUNT(maintenances.id) AS total_tasks'),
                DB::raw('ROUND(SUM(CASE WHEN maintenances.status = "completed" THEN 1 ELSE 0 END) * 100.0 / COUNT(maintenances.id), 2) AS completion_rate')
            )
            ->groupBy('venues.id', 'venues.name')
            ->get();

        $venueUtilization = DB::table('bookings')
            ->join('venues', 'bookings.venue_id', '=', 'venues.id')
            ->select(
                'venues.name AS venue_name',
                DB::raw('SUM((julianday(bookings.end_time) - julianday(bookings.start_time)) * 24) AS total_hours_booked')
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
}
