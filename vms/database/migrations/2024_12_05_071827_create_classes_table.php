<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassesTable extends Migration
{
    public function up()
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('subject_name');
            $table->string('lecturer_name')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('venue');
            $table->timestamps(); // created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('classes');
    }


};
