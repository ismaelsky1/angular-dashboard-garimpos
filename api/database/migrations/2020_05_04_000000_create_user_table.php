<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTable extends Migration
{
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email',150);
            $table->string('password',255);
            $table->string('type',10); // -- CANDIDATE, COMPANY, CONSULTANT
            $table->datetime('verified_email_at')->nullable();
            $table->text('remember_token')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }


    public function down()
    {
        Schema::dropIfExists('user');
    }
}
