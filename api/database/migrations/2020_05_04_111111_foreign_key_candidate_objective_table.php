<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyCandidateObjectiveTable extends Migration
{
    public function up()
    {
        Schema::table('candidate_objective', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidate')->onDelete('no action')->onUpdate('no action');
            $table->foreign('occupation_id')->references('id')->on('occupation')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('candidate_objective', function (Blueprint $table) {
            $table->dropForeign('candidate_objective_candidate_id_foreign');
            // $table->dropForeign('candidate_objective_occupation_id_foreign');
        });
    }
}
