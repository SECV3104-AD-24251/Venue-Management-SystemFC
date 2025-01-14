<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_maintenances_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaintenancesTable extends Migration
{
    public function up()
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('venue_id')->constrained()->onDelete('cascade');
            $table->string('description')->nullable();
            $table->date('scheduled_for_date')->nullable();
            $table->time('scheduled_for_time')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'in-progress'])->default('scheduled');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenances');
    }
}

