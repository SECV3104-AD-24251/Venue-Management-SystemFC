<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venue;

class VenueSeeder extends Seeder
{
    public function run()
    {
        // Clear existing data
        Venue::truncate();

        // Seed new data
        $venue = new Venue();
        $venue->name = 'Auditorium';
        $venue->location = 'Building 2, Floor 1';
        $venue->capacity = 200;
        $venue->save();
    }
}
