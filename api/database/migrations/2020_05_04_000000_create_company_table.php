<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTable extends Migration
{
    public function up()
    {
        Schema::create('company', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name',150);
            $table->string('fantasy_name',150)->nullable();
            $table->string('document',14)->nullable();
            $table->string('cellphone',11);
            $table->string('email',150);
            $table->string('street',200)->nullable();
            $table->string('district',150)->nullable();
            $table->string('city',100)->nullable();
            $table->string('zipcode',8)->nullable();
            $table->string('number',11)->nullable();
            $table->string('complement',150)->nullable();
            $table->string('reference',50)->nullable();
            $table->boolean('active')->default(true);
            $table->uuid('user_id');
            $table->uuid('consultant_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('company');
    }
}
