<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        User::factory()
            ->count(20)
            ->create();

        DB::table('users')
            ->insert([
                'username' => 'admin',
                'password' => bcrypt('123456789'),
                'email' => 'admin@admin.admin',
                'first_name' => 'amr',
                'last_name' => 'aboshama',
                'birthdate' => '1998-2-25',
                'gender' => 'M',
                'city' => 'Giza',
                'role' => 'Admin',
            ]);

        DB::table('users')
            ->insert([
                'username' => 'manager',
                'password' => bcrypt('123456789'),
                'email' => 'manager@manager.manager',
                'first_name' => 'amr',
                'last_name' => 'aboshama',
                'birthdate' => '1998-2-25',
                'gender' => 'M',
                'city' => 'Giza',
                'role' => 'Manager',
                'approved' => 1,
            ]);

        DB::table('users')
            ->insert([
                'username' => 'amr',
                'password' => bcrypt('123456789'),
                'email' => 'amr@amr.amr',
                'first_name' => 'amr',
                'last_name' => 'aboshama',
                'birthdate' => '1998-2-25',
                'gender' => 'M',
                'city' => 'Giza',
                'role' => 'Fan',
            ]);

    }
}
