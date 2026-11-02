<?php

use App\Models\Schedule;
use App\Models\User;
use App\Models\Venue;
use Inertia\Testing\AssertableInertia;
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

    $this->venue = Venue::create([
        'name' => 'Schedule Hall',
        'location' => 'Test Location',
        'capacity' => 50,
        'status' => 'available',
        'image' => '/images/schedule-hall.jpg',
    ]);

    $this->lecturer = User::factory()->create(['name' => 'Dr. Smith']);
    $this->lecturer->assignRole('lecturer');
});

it('allows a lecturer to create a class schedule when no conflicts exist', function () {
    $response = $this->actingAs($this->lecturer)->post('/lecturer/schedule', [
        'class_name' => 'Math 101',
        'section' => 1,
        'day' => 'Monday',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertRedirect(route('lecturer.schedule'));

    $this->assertDatabaseHas('schedules', [
        'class_name' => 'Math 101',
        'section' => 1,
        'day' => 'Monday',
        'lecturer_id' => $this->lecturer->id,
        'venue_id' => $this->venue->id,
    ]);
});

it('rejects a class schedule that conflicts with an existing venue schedule', function () {
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

    $response = $this->actingAs($this->lecturer)->post('/lecturer/schedule', [
        'class_name' => 'Math 102',
        'section' => 2,
        'day' => 'Monday',
        'start_time' => '09:30',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertSessionHasErrors('venue_id');

    $this->assertDatabaseMissing('schedules', [
        'class_name' => 'Math 102',
    ]);
});

it('rejects a lecturer from double booking themselves', function () {
    $otherVenue = Venue::create([
        'name' => 'Hall B',
        'location' => 'Test Location 2',
        'capacity' => 40,
        'status' => 'available',
    ]);

    Schedule::create([
        'subject' => 'Math 101',
        'section' => 1,
        'day' => 'Monday',
        'time' => '09:00',
        'duration' => 60,
        'capacity' => 50,
        'lecturer_id' => $this->lecturer->id,
        'venue_id' => $otherVenue->id,
        'start_time' => '09:00',
        'end_time' => '10:00',
    ]);

    $response = $this->actingAs($this->lecturer)->post('/lecturer/schedule', [
        'class_name' => 'Math 102',
        'section' => 2,
        'day' => 'Monday',
        'start_time' => '09:30',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertSessionHasErrors('lecturer_id');
});

it('rejects a class schedule with an invalid day', function () {
    $response = $this->actingAs($this->lecturer)->post('/lecturer/schedule', [
        'class_name' => 'Math 101',
        'section' => 1,
        'day' => 'Saturday',
        'start_time' => '09:00',
        'end_time' => '10:30',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertSessionHasErrors('day');
});

it('rejects a class schedule whose end time is before its start time', function () {
    $response = $this->actingAs($this->lecturer)->post('/lecturer/schedule', [
        'class_name' => 'Math 101',
        'section' => 1,
        'day' => 'Monday',
        'start_time' => '10:00',
        'end_time' => '09:00',
        'venue_id' => $this->venue->id,
    ]);

    $response->assertSessionHasErrors('end_time');
});

it('allows a lecturer to view their own class schedule', function () {
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

    $response = $this->actingAs($this->lecturer)->get('/lecturer/schedule');

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('ClassSchedule')
        ->has('schedules', 1)
        ->where('schedules.0.venue.image', '/images/schedule-hall.jpg'));
});

it('allows an admin to view all class schedules', function () {
    $response = $this->actingAs($this->admin)->get('/admin/schedules');

    $response->assertOk();
    $response->assertInertia(fn (AssertableInertia $page) => $page->component('Admin/Schedules/Index')->has('schedules', 0));
});
