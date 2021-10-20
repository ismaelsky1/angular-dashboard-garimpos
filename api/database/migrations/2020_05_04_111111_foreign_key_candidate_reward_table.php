<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyCandidateRewardTable extends Migration
{
    public function up()
    {
        Schema::table('candidate_reward', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidate')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('candidate_reward', function (Blueprint $table) {
            $table->dropForeign('candidate_reward_candidate_id_foreign');
        });
    }
}
