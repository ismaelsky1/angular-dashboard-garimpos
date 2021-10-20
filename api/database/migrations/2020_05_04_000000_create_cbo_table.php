<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCboTable extends Migration
{
    public function up()
    {
        Schema::create('cbo', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code',20);
            $table->string('name',150);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('cbo');
    }
}
