<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class VenueReportController extends Controller
{
    public function index()
    {
        $mostUsedVenues = DB::table('bookings')
            ->select('venues.name AS venue_name', DB::raw('COUNT(bookings.id) AS total_bookings'))
            ->join('venues', 'booking.venue_id', '=', 'venues.id')
            ->groupBy('venues.name')
            ->orderByDesc('total_bookings')
            ->get();
        
        $mostMaintainedVenues = DB::table('maintenances')
            ->select('venues.name AS venue_name', DB::raw('COUNT(maintenance.id) AS total_maintenance'))
            ->join('venues', 'maintenance.venue_id', '=', 'venues.id')
            ->groupBy('venues.name')
            ->orderByDesc('total_maintenance')
            ->get();

        $maintenanceCompletion = DB::table('maintenances')
            ->select(
                'venue.name AS venue_name',
                DB::raw('COUNT(CASE WHEN maintenance.status = "completed" THEN 1 END) AS completed_maintenance'),
                DB::raw('COUNT(maintenances.id) AS total_maintenance'),
                DB::raw('ROUND(COUNT(CASE WHEN maintenances.status = "completed" THEN 1 END) * 100.0 / COUNT(maintenances.id), 2) AS completion_rate')
            )
            ->join('venues', 'maintenances.venue_id', '=', 'venues.id')
            ->groupBy('venues.name')
            ->get();

         $venueUtilization = DB::table('bookings')
            ->select(
                'venues.name AS venue_name',
                DB::raw('SUM((julianday(bookings.end_time) - julianday(bookings.start_time)) * 24) AS total_hours_booked')
            )
            ->join('venues', 'bookings.venue_id', '=', 'venues.id')
            ->groupBy('venues.name')
            ->orderByDesc('total_hours_booked')
            ->get();

        return response()->json([
            'mostUsedVenues' => $mostUsedVenues,
            'mostMaintainedVenues' => $mostMaintainedVenues,
            'maintenanceCompletion' => $maintenanceCompletion,
            'venueUtilization' =>$venueUtilization,
        ]);
    }

}
