<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::table('venues', function (Blueprint $table) {
        $table->json('equipment')->nullable(); // Storing equipment info
        $table->string('lecture_type')->nullable(); // E.g., 'Seminar', 'Workshop'
    });
}

    public function down()
{
    Schema::table('venues', function (Blueprint $table) {
        $table->dropColumn('equipment');
        $table->dropColumn('lecture_type');
    });
}

};
