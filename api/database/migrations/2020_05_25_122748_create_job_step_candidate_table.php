<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobStepCandidateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_step_candidate', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('job_step_id');
            $table->uuid('candidate_id');
            $table->boolean('check')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('job_step_id')->references('id')->on('job_step')->onDelete('no action')->onUpdate('no action');
            $table->foreign('candidate_id')->references('id')->on('candidate')->onDelete('no action')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_step_candidate');
    }
}
