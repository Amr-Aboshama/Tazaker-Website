<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        DB::table('tickets')
            ->insert([
                'username' => 'amr',
                'match_id' => 1,
                'seat_row' => 3,
                'seat_column' => 3,
            ]);

        DB::table('tickets')
            ->insert([
                'username' => 'amr',
                'match_id' => 1,
                'seat_row' => 3,
                'seat_column' => 2,
            ]);
    }
}
