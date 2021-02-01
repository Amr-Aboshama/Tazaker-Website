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
            $table->unsignedBigInteger('main_referee_id');
            $table->unsignedBigInteger('linesman1_id');
            $table->unsignedBigInteger('linesman2_id');

            $table->foreign('home_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('away_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('stadium')->references('name')->on('stadia')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('main_referee_id')->references('id')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('linesman1_id')->references('id')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('linesman2_id')->references('id')->on('referees')->onUpdate('cascade')->onDelete('cascade');

        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->foreign('match_id')->references('id')->on('matches')->onUpdate('cascade')->onDelete('cascade');
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
