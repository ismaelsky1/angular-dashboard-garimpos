<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsCandidateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('candidate', function (Blueprint $table) {
            $table->string('nickname', 50)->nullable();
            $table->decimal('height')->nullable();
            $table->decimal('weight')->nullable();
            $table->string('rg', 15)->nullable();
            $table->string('rg_emitting_organ', 10)->nullable();
            $table->datetime('rg_issuance_date')->nullable();
            $table->string('rg_state', 2)->nullable();
            $table->string('voter_title', 15)->nullable();
            $table->string('marital_status', 50)->nullable();
            $table->string('naturalness', 50)->nullable();
            $table->string('nationality', 50)->nullable();
            $table->string('cnh', 15)->nullable();
            $table->string('cnh_category', 2)->nullable();
            $table->string('ctps', 15)->nullable();
            $table->string('ctps_state', 2)->nullable();
            $table->string('pis', 15)->nullable();
            $table->string('homepage', 50)->nullable();
            $table->string('introductory_message')->nullable();
            $table->string('language', 50)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('candidate', function (Blueprint $table) {
            //
        });
    }
}
