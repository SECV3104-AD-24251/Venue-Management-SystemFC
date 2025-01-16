<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMaintenancesTable extends Migration
{
    public function up()
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id(); // Auto-increment ID
            $table->foreignId('venue_id')->constrained()->onDelete('cascade'); // Foreign key referencing venues
            $table->string('description')->nullable(); // Maintenance description
            $table->date('scheduled_for_date'); // Maintenance date
            $table->time('scheduled_for_time')->nullable(); // Maintenance start time
            $table->enum('status', ['scheduled', 'completed', 'in-progress'])->default('scheduled'); // Status with default value
            $table->timestamps(); // Created at and Updated at

            // Add indexes for performance optimization
            $table->index(['venue_id', 'scheduled_for_date']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenances');
    }
}
