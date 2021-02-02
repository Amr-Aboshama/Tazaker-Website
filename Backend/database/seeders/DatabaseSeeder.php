<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        MatchSeeder::run();
        RefereeSeeder::run();
        StadiumSeeder::run();
        TeamSeeder::run();
        TicketSeeder::run();
        UserSeeder::run();
    }
}
