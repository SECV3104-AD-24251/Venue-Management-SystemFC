<?php

use App\Models\Schedule;
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
        'name' => 'Schedule Hall',
        'location' => 'Test Location',
        'capacity' => 50,
        'status' => 'available',
    ]);

    $this->lecturer = User::factory()->create(['name' => 'Dr. Smith']);
    $this->lecturer->assignRole('lecturer');
});

it('allows creating a class schedule when no conflicts exist', function () {
    $response = $this->actingAs($this->lecturer, 'sanctum')->post('/api/schedules', [
        'class_name' => 'Math 101',
        'section' => 1,
        'lecturer_name' => 'Dr. Smith',
        'day' => 'Monday',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertRedirect();

    $this->assertDatabaseHas('schedules', [
        'class_name' => 'Math 101',
        'venue_id' => $this->venue->id,
    ]);
});

it('rejects a class schedule that conflicts with an existing schedule', function () {
    Schedule::create([
        'subject' => 'Math 101',
        'section' => 1,
        'day' => 'Monday',
        'time' => '09:00',
        'duration' => 60,
        'capacity' => 50,
        'lecturer_id' => $this->lecturer->id,
        'venue_id' => $this->venue->id,
        'start_time' => '09:00',
        'end_time' => '10:00',
    ]);

    $response = $this->actingAs($this->lecturer, 'sanctum')->post('/api/schedules', [
        'class_name' => 'Math 101',
        'section' => 1,
        'lecturer_name' => 'Dr. Smith',
        'day' => 'Monday',
        'start_time' => '09:30',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertSessionHasErrors('venue_id');

    $this->assertDatabaseMissing('schedules', [
        'class_name' => 'Math 101',
        'start_time' => '09:30',
    ]);
});
