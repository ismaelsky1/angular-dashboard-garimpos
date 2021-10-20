<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCityIdProfileJobTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('profile_job', function (Blueprint $table) {
            $table->uuid('city_id');
            $table->foreign('city_id')->references('id')->on('city')->onDelete('no action')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('profile_job', function (Blueprint $table) {
            $table->dropForeign('profile_job_city_id_foreign');
        });
    }
}
