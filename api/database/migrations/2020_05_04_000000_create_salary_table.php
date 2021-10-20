<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalaryTable extends Migration
{
    public function up()
    {
        Schema::create('salary', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name',20);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('salary');
    }
}
