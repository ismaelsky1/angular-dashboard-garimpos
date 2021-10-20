<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRewardTable extends Migration
{
    public function up()
    {
        Schema::create('reward', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('description',200);
            $table->decimal('quantity');
            $table->decimal('price');
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('reward');
    }
}
