<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->foreignId('lecturer_id')->constrained('users')->onDelete('cascade')->after('id');
            // Assumes 'users' table exists and stores lecturer information.
        });
    }

    public function down(): void
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropForeign(['lecturer_id']);
            $table->dropColumn('lecturer_id');
        });
    }
};
