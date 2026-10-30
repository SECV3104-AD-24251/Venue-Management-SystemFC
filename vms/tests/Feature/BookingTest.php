<?php

use App\Models\Booking;
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

    $this->venue = Venue::create([
        'name' => 'Test Hall',
        'location' => 'Test Location',
        'capacity' => 50,
        'status' => 'available',
    ]);

    $this->lecturer = User::factory()->create();
    $this->lecturer->assignRole('lecturer');
});

it('allows a lecturer to submit a booking request', function () {
    $response = $this->actingAs($this->lecturer)->post('/bookings', [
        'name' => 'Test Lecture',
        'email' => $this->lecturer->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'comments' => 'Intro session',
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('bookings', [
        'venue_id' => $this->venue->id,
        'user_id' => $this->lecturer->id,
        'status' => 'pending',
    ]);
});

it('does not allow a booking that conflicts with an approved booking', function () {
    Booking::create([
        'name' => 'Approved Lecture',
        'email' => $this->lecturer->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'comments' => 'Approved',
        'user_id' => $this->lecturer->id,
        'status' => 'approved',
    ]);

    $bookingCount = Booking::count();

    $this->actingAs($this->lecturer)->post('/bookings', [
        'name' => 'Conflicting Lecture',
        'email' => $this->lecturer->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:30',
        'end_time' => '10:00',
        'comments' => 'Should conflict',
    ])->assertSessionHas('error');

    $this->assertSame($bookingCount, Booking::count());
});

it('allows an admin to approve a pending booking', function () {
    $user = User::factory()->create();
    $user->assignRole('lecturer');

    $booking = Booking::create([
        'name' => 'Pending Lecture',
        'email' => $user->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'comments' => null,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)
        ->patch("/admin/bookings/{$booking->id}/approve")
        ->assertRedirect();

    $this->assertDatabaseHas('bookings', [
        'id' => $booking->id,
        'status' => 'approved',
    ]);
});

it('allows an admin to reject a pending booking', function () {
    $user = User::factory()->create();
    $user->assignRole('lecturer');

    $booking = Booking::create([
        'name' => 'Pending Lecture',
        'email' => $user->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'comments' => null,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);

    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $this->actingAs($admin)
        ->patch("/admin/bookings/{$booking->id}/reject", ['rejection_reason' => 'Room unavailable'])
        ->assertRedirect();

    $this->assertDatabaseHas('bookings', [
        'id' => $booking->id,
        'status' => 'rejected',
        'rejection_reason' => 'Room unavailable',
    ]);
});

it('prevents a lecturer from approving a booking', function () {
    $user = User::factory()->create();
    $user->assignRole('lecturer');

    $booking = Booking::create([
        'name' => 'Pending Lecture',
        'email' => $user->email,
        'capacity' => 30,
        'venue_id' => $this->venue->id,
        'date' => '2026-11-01',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'comments' => null,
        'user_id' => $user->id,
        'status' => 'pending',
    ]);

    $this->actingAs($this->lecturer)
        ->patch("/admin/bookings/{$booking->id}/approve")
        ->assertForbidden();
});
