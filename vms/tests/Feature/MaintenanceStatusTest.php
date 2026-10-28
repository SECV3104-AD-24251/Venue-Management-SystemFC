<?php

use App\Models\Maintenance;
use App\Models\User;
use App\Models\Venue;
use Spatie\Permission\Models\Role;

it('allows staff to update a maintenance job status', function () {
    $role = Role::create(['name' => 'staff', 'guard_name' => 'web']);
    $staff = User::factory()->create();
    $staff->assignRole($role);
    $this->actingAs($staff);

    $venue = Venue::create([
        'name' => 'Test venue',
        'location' => 'Test location',
        'capacity' => 20,
    ]);
    $maintenance = Maintenance::create([
        'venue_id' => $venue->id,
        'description' => 'Repair lighting',
        'scheduled_for_date' => '2026-10-15',
        'scheduled_for_time' => '09:00',
        'status' => 'scheduled',
    ]);

    $response = $this->postJson(route('maintenance.updateStatus', $maintenance), [
        'status' => 'in-progress',
    ]);

    $response->assertOk()
        ->assertJson(['success' => true]);
    $this->assertDatabaseHas('maintenances', [
        'id' => $maintenance->id,
        'status' => 'in-progress',
        'completed_at' => null,
    ]);
});
