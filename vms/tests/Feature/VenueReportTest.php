<?php

use App\Models\Booking;
use App\Models\Maintenance;
use App\Models\User;
use App\Models\Venue;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    foreach (['admin', 'lecturer', 'staff'] as $role) {
        Role::firstOrCreate([
            'name' => $role,
            'guard_name' => 'web',
        ]);
    }

    $this->staff = User::factory()->create();
    $this->staff->assignRole('staff');
});

it('allows a staff member to view venue reports', function () {
    $this->actingAs($this->staff)->get('/venue-reports')->assertOk();
});

it('passes venue booking and maintenance reports to the page', function () {
    $venue = Venue::create([
        'name' => 'Report Hall',
        'location' => 'North Wing',
        'capacity' => 80,
        'status' => 'available',
    ]);

    Booking::create([
        'name' => 'Report Booking',
        'email' => $this->staff->email,
        'capacity' => 40,
        'venue_id' => $venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'user_id' => $this->staff->id,
        'status' => 'approved',
    ]);

    Maintenance::create([
        'venue_id' => $venue->id,
        'description' => 'Report maintenance',
        'scheduled_for_date' => '2026-11-02',
        'status' => 'completed',
    ]);

    $this->actingAs($this->staff)
        ->get('/venue-reports')
        ->assertInertia(fn (Assert $page) => $page
            ->component('VenueReports')
            ->where('summary.totalVenues', 1)
            ->where('summary.totalBookings', 1)
            ->where('summary.totalMaintenance', 1)
            ->where('summary.completedMaintenance', 1)
            ->where('mostUsedVenues.0.venue_name', 'Report Hall')
            ->where('mostUsedVenues.0.total_bookings', 1)
            ->where('maintenanceCompletion.0.completion_rate', 100)
            ->where('venueUtilization.0.total_hours_booked', 1.5)
        );
});
