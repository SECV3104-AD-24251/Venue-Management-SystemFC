<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venue;
use Illuminate\Support\Facades\DB;

class VenueSeeder extends Seeder
{
    public function run()
    {
        DB::table('venues')->truncate();

        Venue::create(['name' => 'Bilik Kuliah', 'location' => 'N28', 'capacity' => 40]);
        Venue::create(['name' => 'Makmal Pengaturcaraan Komputer', 'location' => 'N28', 'capacity' => 60]);
        Venue::create(['name' => 'Kejora Hall', 'location' => 'N28A', 'capacity' => 200]);
        Venue::create(['name' => 'Active Learning Lab', 'location' => 'N28, Level 3', 'capacity' => 40]);
        Venue::create(['name' => 'Lecture Room Type A', 'location' => 'N28A, N28', 'capacity' => 60]);
        Venue::create(['name' => 'Lecture Room Type B', 'location' => 'N28A, N28', 'capacity' => 40]);
        Venue::create(['name' => 'Meeting Room', 'location' => 'N28A, N28', 'capacity' => 40]);
        Venue::create(['name' => 'Discussion Room', 'location' => 'N28A, Level 2', 'capacity' => 10]);
        Venue::create(['name' => 'Computer Lab', 'location' => 'N28A, N28', 'capacity' => 60]);
        Venue::create(['name' => 'Tutorial Room', 'location' => 'N28A, Level 1', 'capacity' => 25]);
        Venue::create(['name' => 'CCNP Network Lab', 'location' => 'N28A, Level 4', 'capacity' => 40]);

        //Venue::destroy(9); // Delete venue with ID 1
        

    }
}
