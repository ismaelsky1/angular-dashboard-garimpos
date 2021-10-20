<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyCompanyTable extends Migration
{
    public function up()
    {
        Schema::table('company', function (Blueprint $table) {
            $table->foreign('consultant_id')->references('id')->on('consultant')->onDelete('no action')->onUpdate('no action');
            $table->foreign('user_id')->references('id')->on('user')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('company', function (Blueprint $table) {
            $table->dropForeign('company_consultant_id_foreign');
            $table->dropForeign('company_user_id_foreign');
        });
    }
}
