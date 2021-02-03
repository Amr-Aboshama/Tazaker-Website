<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        DB::table('matches')
            ->insert([
                'home_team' => 'Al-Ahly',
                'away_team' => 'Bayern Munchien',
                'match_venue' => 'Cairo',
                'date' => '2021-07-02',
                'time' => '21:00',
                'main_referee' => '7moda',
                'first_linesman' => 'Pasta',
                'second_linesman' => 'Habd',
            ]);
    }
}
