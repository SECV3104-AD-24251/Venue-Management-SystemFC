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
        Schema::table('schedules', function (Blueprint $table) {
            $table->foreignId('venue_id')->nullable()->constrained('venues')->onDelete('set null')->after('capacity');
            $table->string('class_name')->nullable()->after('venue_id');
            $table->string('lecturer_name')->nullable()->after('class_name');
            $table->time('start_time')->nullable()->after('lecturer_name');
            $table->time('end_time')->nullable()->after('start_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['venue_id']);
            $table->dropColumn(['venue_id', 'class_name', 'lecturer_name', 'start_time', 'end_time']);
        });
    }
};
