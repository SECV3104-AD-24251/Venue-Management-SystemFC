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

    $this->staff = User::factory()->create();
    $this->staff->assignRole('staff');
});

it('allows a staff member to view venue reports', function () {
    $this->actingAs($this->staff)->get('/venue-reports')->assertOk();
});
