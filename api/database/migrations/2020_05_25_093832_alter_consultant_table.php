<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterConsultantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('consultant', function (Blueprint $table) {
            $table->string('fantasy_name',150)->nullable();
            $table->boolean('active')->default(true);

            $table->dropColumn('birthday');
            $table->dropColumn('city');
            $table->uuid('city_id')->nullable();
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
        Schema::table('consultant', function (Blueprint $table) {
            $table->dropForeign('consultant_city_id_foreign');
            $table->dropColumn('city_id');
            $table->dropColumn('active');
        });
    }
}
