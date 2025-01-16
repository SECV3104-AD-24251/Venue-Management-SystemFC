<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'level' => 1, // Admin
        ]);

        User::create([
            'name' => 'Lecturer',
            'email' => 'lecturer@example.com',
            'password' => bcrypt('password'),
            'level' => 2, // Editor
        ]);

        User::create([
            'name' => 'Staff',
            'email' => 'staff@example.com',
            'password' => bcrypt('password'),
            'level' => 3, // Viewer
        ]);
    }
}
