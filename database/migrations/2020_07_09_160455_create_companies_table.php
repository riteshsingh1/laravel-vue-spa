<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->string('code');
            $table->integer('pincode');
            $table->string('address');
            $table->string('email');
            $table->text('about');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('companies');
    }
}
