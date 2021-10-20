<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyCandidateExperienceTable extends Migration
{
    public function up()
    {
        Schema::table('candidate_experience', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidate')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('candidate_experience', function (Blueprint $table) {
            $table->dropForeign('candidate_experience_candidate_id_foreign');
        });
    }
}
