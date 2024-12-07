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

        Venue::create(['name' => 'Bilik Kuliah', 'location' => 'N28', 'capacity' => 40, 'image' => '/images/bk.jpeg']);
        Venue::create(['name' => 'Kejora Hall', 'location' => 'N28A', 'capacity' => 200, 'image' => '/images/kejora.jpg']);
        Venue::create(['name' => 'Active Learning Lab', 'location' => 'N28, Level 3', 'capacity' => 40, 'image' => '/images/1.png']);
        Venue::create(['name' => 'Lecture Room Type A', 'location' => 'N28A, N28', 'capacity' => 60, 'image' => '/images/lectureA.png']);
        Venue::create(['name' => 'Lecture Room Type B', 'location' => 'N28A, N28', 'capacity' => 40, 'image' => '/images/lectureB.png']);
        Venue::create(['name' => 'Meeting Room', 'location' => 'N28A, N28', 'capacity' => 40, 'image' => '/images/meeting.png']);
        Venue::create(['name' => 'Discussion Room', 'location' => 'N28A, Level 2', 'capacity' => 10, 'image' => '/images/discussion.png']);
        Venue::create(['name' => 'Computer Lab', 'location' => 'N28A, N28', 'capacity' => 60, 'image' => '/images/mpk.jpg']);
        Venue::create(['name' => 'Tutorial Room', 'location' => 'N28A, Level 1', 'capacity' => 25, 'image' => '/images/tutor.png']);
        Venue::create(['name' => 'CCNP Network Lab', 'location' => 'N28A, Level 4', 'capacity' => 40, 'image' => '/images/ccnp.jpg']);

    }
}
