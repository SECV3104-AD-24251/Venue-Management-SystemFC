<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Venue;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run()
    {
        Venue::create(['name' => 'Lecture Hall A', 'location' => 'Building A', 'capacity' => 120]);
        Venue::create(['name' => 'Auditorium', 'location' => 'Main Block', 'capacity' => 500]);
    }
    
}
