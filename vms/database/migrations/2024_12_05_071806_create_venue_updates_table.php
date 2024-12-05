<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVenueUpdatesTable extends Migration
{
    public function up()
    {
        Schema::create('venue_updates', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('class_id'); // Foreign Key
            $table->string('new_venue');
            $table->timestamps(); // created_at and updated_at

            $table->foreign('class_id')->references('id')->on('classes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('venue_updates');
    }
};

