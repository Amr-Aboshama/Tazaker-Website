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
            $table->string('match_venue');
            $table->date('date');
            $table->time('time');
            $table->string('main_referee');
            $table->string('first_linesman');
            $table->string('second_linesman');

            $table->foreign('home_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('away_team')->references('name')->on('teams')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('match_venue')->references('name')->on('stadia')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('main_referee')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('first_linesman')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('second_linesman')->references('name')->on('referees')->onUpdate('cascade')->onDelete('cascade');

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
