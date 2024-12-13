<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_class_schedules_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassSchedulesTable extends Migration
{
    public function up()
    {
        Schema::create('class_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('venue_id')->constrained()->onDelete('cascade'); // Venue ID, assuming you have a Venue table
            $table->string('lecturer_name');
            $table->string('day');  // Store day (e.g., Monday, Tuesday, etc.)
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('class_schedules');
    }

    
};

ClassSchedule::create([
    'venue_id' => 1,
    'class_name' => 'Mathematics 101',
    'lecturer_name' => 'John Doe',
    'day' => 'Monday',
    'start_time' => '09:00',
    'end_time' => '11:00',
]);


