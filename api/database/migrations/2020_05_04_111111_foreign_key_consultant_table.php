<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyConsultantTable extends Migration
{
    public function up()
    {
        Schema::table('consultant', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('user')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('consultant', function (Blueprint $table) {
            $table->dropForeign('consultant_user_id_foreign');
        });
    }
}
