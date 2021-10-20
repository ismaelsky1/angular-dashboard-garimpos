<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCandidateExperienceTable extends Migration
{
    public function up()
    {
        Schema::create('candidate_experience', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('candidate_id');
            $table->string('company',100);
            $table->string('occupation',120);
            $table->string('activities',200);
            $table->date('initial_date');
            $table->date('final_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('candidate_experience');
    }
}
