<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCandidateSkillTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('candidate_skill', function (Blueprint $table) {
            $table->string('company',100)->nullable();
            $table->string('type',50)->nullable();
            $table->integer('work_load')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidate_skill', function (Blueprint $table) {
            //
        });
    }
}
