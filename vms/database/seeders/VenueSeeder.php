<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venue;

class VenueSeeder extends Seeder
{
    public function run()
    {
       Venue::create(['name' => 'Main Auditorium', 'name'=> 'Building A', 'capacity'=> 500 ]);
       Venue::create(['name' => 'ConferenceB Hall', 'name'=> 'Building c', 'capacity'=> 200 ]);
       Venue::create(['name' => 'Outdoor Stage', 'name'=> 'Building B', 'capacity'=> 1000 ]);
    }
}
