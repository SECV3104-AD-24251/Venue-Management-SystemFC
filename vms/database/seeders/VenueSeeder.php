<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VenueSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        DB::table('venues')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

        Venue::create(['name' => 'Bilik Kuliah', 'location' => 'N28', 'capacity' => 40, 'image' => '/images/bk.jpeg', 'info1' => 'Projector',
            'info1' => 'Air-Conditioner', 'info2' => 'White Board', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);
        Venue::create(['name' => 'Kejora Hall', 'location' => 'N28A', 'capacity' => 200, 'image' => '/images/kejora.jpg',
            'info1' => 'Projector are provided ( on ceiling )', 'info2' => 'PA system provided', 'info3' => 'WIPG Wireless system', 'info4' => 'Total of 1 seminar hall']);
        Venue::create(['name' => 'Active Learning Lab', 'location' => 'N28, Level 3', 'capacity' => 40, 'image' => '/images/1.png',
            'info1' => 'Air-Conditioner', 'info2' => 'TV provided', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);
        Venue::create(['name' => 'Lecture Room Type A', 'location' => 'N28A, N28', 'capacity' => 60, 'image' => '/images/lectureA.png',
            'info1' => 'Air-Conditioner', 'info2' => 'Desktop PC provided', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);
        Venue::create(['name' => 'Lecture Room Type B', 'location' => 'N28A, N28', 'capacity' => 40, 'image' => '/images/lectureB.png',
            'info1' => 'Projector are provided (on ceiling)', 'info2' => 'Desktop PC provided', 'info3' => 'Microphone will be provide', 'info4' => 'Total of 9 lecturer room']);
        Venue::create(['name' => 'Meeting Room', 'location' => 'N28A, N28', 'capacity' => 40, 'image' => '/images/meeting.png',
            'info1' => 'Air-Conditioner', 'info2' => 'Desktop PC provided', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);
        Venue::create(['name' => 'Discussion Room', 'location' => 'N28A, Level 2', 'capacity' => 10, 'image' => '/images/discussion.png',
            'info1' => 'Air-Conditioner', 'info2' => 'Total of 3 discussion  room available', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);
        Venue::create(['name' => 'Computer Lab', 'location' => 'N28A, N28', 'capacity' => 60, 'image' => '/images/mpk.jpg',
            'info1' => 'WIPG Wireless system', 'info2' => 'Desktop PC provided', 'info3' => 'White Board', 'info4' => 'Total of 12 Computer lab']);
        Venue::create(['name' => 'Tutorial Room', 'location' => 'N28A, Level 1', 'capacity' => 25, 'image' => '/images/tutor.png',
            'info1' => 'Air-Conditioner', 'info2' => 'Desktop PC provided', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'Total of 6 tutorial room']);
        Venue::create(['name' => 'CCNP Network Lab', 'location' => 'N28A, Level 4', 'capacity' => 40, 'image' => '/images/ccnp.jpg',
            'info1' => 'Air-Conditioner', 'info2' => 'Desktop PC provided', 'info3' => 'Projector are provided ( on ceiling )', 'info4' => 'WiFi facility given']);

    }
}
