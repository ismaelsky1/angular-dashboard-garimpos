<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyCandidateTable extends Migration
{
    public function up()
    {
        Schema::table('candidate', function (Blueprint $table) {
            $table->foreign('consultant_id')->references('id')->on('consultant')->onDelete('no action')->onUpdate('no action');
            $table->foreign('user_id')->references('id')->on('user')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('candidate', function (Blueprint $table) {
            $table->dropForeign('candidate_consultant_id_foreign');
            $table->dropForeign('candidate_user_id_foreign');
        });
    }
}
