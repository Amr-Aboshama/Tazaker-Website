<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        Team::factory()
            ->count(20)
            ->create();

        DB::table('teams')
            ->insert([
                'name' => 'Al-Ahly',
            ]);

        DB::table('teams')
            ->insert([
                'name' => 'Bayern Munchien',
            ]);
    }
}
