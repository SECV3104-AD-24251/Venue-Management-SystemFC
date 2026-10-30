<?php

use App\Models\User;
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

    $this->lecturer = User::factory()->create();
    $this->lecturer->assignRole('lecturer');

    $this->staff = User::factory()->create();
    $this->staff->assignRole('staff');
});

it('redirects guests to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

it('allows an admin to view the admin dashboard', function () {
    $this->actingAs($this->admin)->get('/admin')->assertOk();
});

it('prevents a lecturer from viewing the admin dashboard', function () {
    $this->actingAs($this->lecturer)->get('/admin')->assertForbidden();
});

it('prevents a staff member from viewing the admin dashboard', function () {
    $this->actingAs($this->staff)->get('/admin')->assertForbidden();
});

it('allows a lecturer to view the booking page', function () {
    $this->actingAs($this->lecturer)->get('/booking')->assertOk();
});

it('allows a lecturer to view their bookings', function () {
    $this->actingAs($this->lecturer)->get('/viewbooking')->assertOk();
});

it('allows a staff member to view maintenance', function () {
    $this->actingAs($this->staff)->get('/maintenance')->assertOk();
});

it('allows a staff member to view venue reports', function () {
    $this->actingAs($this->staff)->get('/venue-reports')->assertOk();
});
