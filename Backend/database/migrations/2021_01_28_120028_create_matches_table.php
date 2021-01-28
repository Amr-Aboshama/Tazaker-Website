<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->string('home_team');
            $table->string('away_team');
            $table->string('stadium');
            $table->dateTime('date');
            $table->integer('main_referee');
            $table->integer('linesman_1');
            $table->integer('linesman_2');

            $table->primary('id');
            
            $table->foreign('home_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('away_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('stadium')->references('name')->on('stadia')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('main_referee')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('linesman_1')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('linesman_2')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
