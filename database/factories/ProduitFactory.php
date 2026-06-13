<?php

namespace Database\Factories;

use App\Models\Categorie;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    protected $model = Produit::class;

    public function definition(): array
    {
        $prix = fake()->randomFloat(2, 100, 15000);
        $debut = now()->subHours(fake()->numberBetween(0, 48));

        return [
            'vendeur_id' => User::factory(),
            'categorie_id' => Categorie::factory(),
            'libelle' => ucfirst(fake()->words(3, true)),
            'description' => fake()->paragraphs(2, true),
            'image' => null,
            'prix_initial' => $prix,
            'prix_actuel' => $prix,
            'date_debut' => $debut,
            'date_fin' => $debut->copy()->addDays(3),
            'statut' => 'EN_COURS',
        ];
    }

    public function termine(): static
    {
        return $this->state(fn () => [
            'date_debut' => now()->subDays(5),
            'date_fin' => now()->subDays(2),
            'statut' => 'TERMINE',
        ]);
    }

    public function bientotExpire(): static
    {
        return $this->state(fn () => [
            'date_debut' => now()->subDays(2)->subHours(22),
            'date_fin' => now()->addHours(2),
            'statut' => 'EN_COURS',
        ]);
    }
}
