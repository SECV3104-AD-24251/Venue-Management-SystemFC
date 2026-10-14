<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'lecturer']);
        Role::firstOrCreate(['name' => 'staff']);

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole('admin');

        $lecturer = User::create([
            'name' => 'Lecturer',
            'email' => 'lecturer@example.com',
            'password' => bcrypt('password'),
        ]);
        $lecturer->assignRole('lecturer');

        $staff = User::create([
            'name' => 'Staff',
            'email' => 'staff@example.com',
            'password' => bcrypt('password'),
        ]);
        $staff->assignRole('staff');
    }
}
