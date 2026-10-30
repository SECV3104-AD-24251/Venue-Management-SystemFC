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

    $this->user = User::factory()->create();
    $this->user->assignRole('lecturer');
});

it('returns booking summary counts', function () {
    $response = $this->actingAs($this->user)->getJson('/api/reports/bookings/summary');

    $response->assertOk()
        ->assertJsonStructure(['summary' => ['total', 'approved', 'pending', 'rejected', 'expired']]);
});

it('returns maintenance summary counts', function () {
    $response = $this->actingAs($this->user)->getJson('/api/reports/maintenances/summary');

    $response->assertOk()
        ->assertJsonStructure(['summary' => ['total', 'scheduled', 'in_progress', 'completed']]);
});

it('returns the unread notification count', function () {
    $response = $this->actingAs($this->user)->getJson('/api/notifications/unread-count');

    $response->assertOk()
        ->assertJson(['unread_count' => 0]);
});

it('allows bulk maintenance status updates', function () {
    $venue = Venue::create([
        'name' => 'Bulk Hall',
        'location' => 'Test Location',
        'capacity' => 30,
        'status' => 'available',
    ]);

    $maintenance = \App\Models\Maintenance::create([
        'venue_id' => $venue->id,
        'description' => 'Lighting repair',
        'scheduled_for_date' => '2026-11-01',
        'scheduled_for_time' => '09:00',
        'status' => 'scheduled',
    ]);

    $response = $this->actingAs($this->user, 'sanctum')->postJson('/api/maintenances/status/bulk', [
        'ids' => [$maintenance->id],
        'status' => 'in-progress',
    ]);

    $response->assertOk()
        ->assertJson(['success' => true]);

    $this->assertDatabaseHas('maintenances', [
        'id' => $maintenance->id,
        'status' => 'in-progress',
    ]);
});
