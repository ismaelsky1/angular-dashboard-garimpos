<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfileJobTable extends Migration
{
    public function up()
    {
        Schema::create('profile_job', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('company_id');
            $table->string('title',200);
            $table->string('range_age_start',255)->nullable();
            $table->string('range_age_end',255)->nullable();
            $table->decimal('range_weight_start')->nullable();
            $table->decimal('range_weight_end')->nullable();
            $table->decimal('range_height_start')->nullable();
            $table->decimal('range_height_end')->nullable();
            $table->uuid('salary_id');
            $table->uuid('work_hour_id');
            $table->string('gender',1);
            $table->text('human_characteristics')->nullable();
            $table->text('technical_characteristics')->nullable();
            $table->text('experiences')->nullable();
            $table->text('observations')->nullable();
            $table->string('status',15);
            $table->string('key_words',255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('profile_job');
    }
}
