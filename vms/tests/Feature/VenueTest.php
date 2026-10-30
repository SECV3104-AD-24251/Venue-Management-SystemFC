<?php

use App\Models\User;
use App\Models\Venue;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    foreach (['admin', 'lecturer', 'staff'] as $role) {
        Role::firstOrCreate([
            'name' => $role,
            'guard_name' => 'web',
        ]);
    }

    $this->admin = User::factory()->create();
    $this->admin->assignRole('admin');
});

it('allows an admin to create a venue', function () {
    $response = $this->actingAs($this->admin)->post('/admin/venues', [
        'name' => 'New Hall',
        'location' => 'Campus A',
        'capacity' => 100,
        'status' => 'available',
    ]);

    $response->assertRedirect(route('venue-management.index'));

    $this->assertDatabaseHas('venues', [
        'name' => 'New Hall',
        'location' => 'Campus A',
        'capacity' => 100,
    ]);
});

it('checks venue availability for a free time slot', function () {
    $venue = Venue::create([
        'name' => 'Free Hall',
        'location' => 'Campus B',
        'capacity' => 40,
        'status' => 'available',
    ]);

    $response = $this->actingAs($this->admin)->postJson('/api/venues/check-availability', [
        'venue_id' => $venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:00',
    ]);

    $response->assertOk()
        ->assertJson([
            'venue_id' => $venue->id,
            'available' => true,
        ]);
});

it('checks venue availability when the time slot is booked', function () {
    $venue = Venue::create([
        'name' => 'Booked Hall',
        'location' => 'Campus C',
        'capacity' => 40,
        'status' => 'available',
    ]);

    \App\Models\Booking::create([
        'name' => 'Booked Lecture',
        'email' => 'lecturer@example.com',
        'capacity' => 30,
        'venue_id' => $venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:00',
        'comments' => null,
        'user_id' => $this->admin->id,
        'status' => 'approved',
    ]);

    $response = $this->actingAs($this->admin)->postJson('/api/venues/check-availability', [
        'venue_id' => $venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:30',
        'end_time' => '10:00',
    ]);

    $response->assertOk()
        ->assertJson([
            'venue_id' => $venue->id,
            'available' => false,
        ]);
});
