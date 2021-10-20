<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCandidateObjectiveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('candidate_objective', function (Blueprint $table) {
            $table->dropForeign('candidate_objective_occupation_id_foreign');
            $table->renameColumn('occupation_id', 'cbo_id');
            $table->foreign('cbo_id')->references('id')->on('cbo')->onDelete('no action')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidate_objective', function (Blueprint $table) {
            $table->dropForeign('candidate_objective_cbo_id_foreign');

            $table->renameColumn('cbo_id', 'occupation_id');
        });
    }
}
