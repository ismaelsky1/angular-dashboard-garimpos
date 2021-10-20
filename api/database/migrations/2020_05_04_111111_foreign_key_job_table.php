<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyJobTable extends Migration
{
    public function up()
    {
        Schema::table('job', function (Blueprint $table) {
            $table->foreign('salary_id')->references('id')->on('salary')->onDelete('no action')->onUpdate('no action');
            $table->foreign('work_hour_id')->references('id')->on('work_hour')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('job', function (Blueprint $table) {
            $table->dropForeign('job_salary_id_foreign');
            $table->dropForeign('job_work_hour_id_foreign');
        });
    }
}
