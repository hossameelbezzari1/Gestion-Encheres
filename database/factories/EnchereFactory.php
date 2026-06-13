<?php

namespace Database\Factories;

use App\Models\Enchere;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnchereFactory extends Factory
{
    protected $model = Enchere::class;

    public function definition(): array
    {
        return [
            'acheteur_id' => User::factory(),
            'produit_id' => Produit::factory(),
            'montant' => fake()->randomFloat(2, 100, 20000),
            'date_enchere' => now()->subMinutes(fake()->numberBetween(1, 2000)),
        ];
    }
}
