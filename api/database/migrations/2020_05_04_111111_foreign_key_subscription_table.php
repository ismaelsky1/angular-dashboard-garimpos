<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeySubscriptionTable extends Migration
{
    public function up()
    {
        Schema::table('subscription', function (Blueprint $table) {
            $table->foreign('candidate_id')->references('id')->on('candidate')->onDelete('no action')->onUpdate('no action');
            $table->foreign('job_id')->references('id')->on('job')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('subscription', function (Blueprint $table) {
            $table->dropForeign('subscription_candidate_id_foreign');
            $table->dropForeign('subscription_job_id_foreign');
        });
    }
}
