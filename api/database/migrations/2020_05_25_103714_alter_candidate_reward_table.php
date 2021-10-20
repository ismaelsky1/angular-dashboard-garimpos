<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCandidateRewardTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('candidate_reward', function (Blueprint $table) {
            $table->uuid('reward_id')->nullable();
            $table->foreign('reward_id')->references('id')->on('reward')->onDelete('no action')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidate_reward', function (Blueprint $table) {
            $table->dropForeign('candidate_reward_reward_id_foreign');
        });
    }
}
