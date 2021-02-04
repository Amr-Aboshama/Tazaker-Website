<?php

namespace Database\Seeders;

use App\Models\Referee;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RefereeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        Referee::factory()
            ->count(20)
            ->create();

        DB::table('referees')
            ->insert([
                'name' => '7moda',
            ]);

        DB::table('referees')
            ->insert([
                'name' => 'Pasta',
            ]);

        DB::table('referees')
            ->insert([
                'name' => 'Habd',
            ]);
    }
}
