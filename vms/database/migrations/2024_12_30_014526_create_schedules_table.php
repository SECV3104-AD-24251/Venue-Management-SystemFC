<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->string('subject');
            $table->integer('section');
            $table->string('day');
            $table->time('time');
            $table->integer('duration'); // Duration in minutes
            $table->integer('capacity');
            $table->foreignId('classroom_id')->constrained('classrooms')->onDelete('cascade'); // Link to classrooms
            $table->foreignId('lecturer_id')->constrained('users')->onDelete('cascade'); // Link to lecturers
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
