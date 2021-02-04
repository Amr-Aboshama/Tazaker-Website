<?php

namespace Database\Seeders;

use App\Models\Stadium;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StadiumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        Stadium::factory()
            ->count(20)
            ->create();

        DB::table('stadia')
            ->insert([
                'name' => 'Cairo',
                'row_count' => 5,
                'column_count' => 5,
            ]);
    }
}
