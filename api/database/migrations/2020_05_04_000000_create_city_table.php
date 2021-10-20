<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCityTable extends Migration
{
    public function up()
    {
        Schema::create('city', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code',15)->nullable();
            $table->string('name',180);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('city');
    }
}
