<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForeignKeyProfileJobTable extends Migration
{
    public function up()
    {
        Schema::table('profile_job', function (Blueprint $table) {
            $table->foreign('company_id')->references('id')->on('company')->onDelete('no action')->onUpdate('no action');
            $table->foreign('salary_id')->references('id')->on('salary')->onDelete('no action')->onUpdate('no action');
            $table->foreign('work_hour_id')->references('id')->on('work_hour')->onDelete('no action')->onUpdate('no action');
        });
    }


    public function down()
    {
        Schema::table('profile_job', function (Blueprint $table) {
            $table->dropForeign('profile_job_company_id_foreign');
            $table->dropForeign('profile_job_salary_id_foreign');
            $table->dropForeign('profile_job_work_hour_id_foreign');
        });
    }
}
