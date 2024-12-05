<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClassModel; // Ensure the correct model name

class ClassSeeder extends Seeder
{
    public function run()
    {
        ClassModel::create([
            'subject_name' => 'Mathematics 101',
            'lecturer_name' => 'Dr. John Doe',
            'start_time' => now(),
            'end_time' => now()->addHours(2),
            'venue' => 'Room A101',
        ]);
    }
}
