<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOccupationTable extends Migration
{
    public function up()
    {
        Schema::create('occupation', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name',150);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('occupation');
    }
}
