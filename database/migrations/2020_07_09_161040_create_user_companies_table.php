<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('user_companies', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('company_id');

            $table->foreign('user_id')
                    ->on('users')
                    ->references('id')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->foreign('company_id')
                    ->on('companies')
                    ->references('id')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_companies');
    }
}
