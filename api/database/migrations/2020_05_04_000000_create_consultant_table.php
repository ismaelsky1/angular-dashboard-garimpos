<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultantTable extends Migration
{
    public function up()
    {
        Schema::create('consultant', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name',150);
            $table->string('document',14)->nullable();
            $table->datetime('birthday');
            $table->string('street',150)->nullable();
            $table->string('district',150)->nullable();
            $table->string('city',255)->nullable();
            $table->string('zipcode',8)->nullable();
            $table->string('number',11)->nullable();
            $table->string('complement',150)->nullable();
            $table->string('reference',150)->nullable();
            $table->uuid('user_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('consultant');
    }
}
