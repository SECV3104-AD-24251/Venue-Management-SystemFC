<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venue;

class VenueSeeder extends Seeder
{
    public function run()
    {
        Venue::create(['name' => 'Main Auditorium', 'location' => 'Building A', 'capacity' => 500]);
        Venue::create(['name' => 'Conference Hall', 'location' => 'Building B', 'capacity' => 300]);
        Venue::create(['name' => 'Outdoor Stage', 'location' => 'Central Park', 'capacity' => 1000]);
    }
}
