<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'username' => $this->faker->unique()->userName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('123456789'), // password
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'birthdate' => now()->format('Y-m-d'),
            'gender' => $this->faker->randomElement(['M', 'F']),
            'city' => $this->faker->city,
            'address' => $this->faker->address,
            'role' => $this->faker->randomElement(['Manager', 'Fan']),
            'approved' => $this->faker->randomElement([true, false]),
        ];
    }
}
