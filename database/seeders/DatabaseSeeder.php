<?php

namespace Database\Seeders;

use App\Models\Categorie;
use App\Models\Enchere;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@encheres.test'],
            [
                'name' => 'Administrateur',
                'type' => 'ADMIN',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $users = User::where('type', 'CLIENT')->get();
        if ($users->count() < 10) {
            User::factory(10 - $users->count())->create();
            $users = User::where('type', 'CLIENT')->get();
        }

        $categories = collect([
            ['nom' => 'Art & Collection', 'description' => 'Œuvres, objets rares et pièces de collection.'],
            ['nom' => 'Électronique', 'description' => 'Appareils et équipements électroniques.'],
            ['nom' => 'Maison', 'description' => 'Mobilier, décoration et équipements.'],
            ['nom' => 'Mode', 'description' => 'Vêtements, montres et accessoires.'],
            ['nom' => 'Véhicules', 'description' => 'Voitures, motos et accessoires automobiles.'],
        ])->map(fn ($data) => Categorie::updateOrCreate(['nom' => $data['nom']], $data));

        if (Produit::exists()) {
            return;
        }

        $produits = collect();
        $produits->push(...Produit::factory(12)->recycle($users)->recycle($categories)->create());
        $produits->push(...Produit::factory(4)->bientotExpire()->recycle($users)->recycle($categories)->create());
        $produits->push(...Produit::factory(4)->termine()->recycle($users)->recycle($categories)->create());

        $produits->each(function (Produit $produit) use ($users) {
            if (fake()->boolean(75)) {
                $prix = (float) $produit->prix_initial;
                foreach (range(1, fake()->numberBetween(1, 5)) as $index) {
                    $prix = round($prix * 1.10, 2);
                    Enchere::create([
                        'acheteur_id' => $users->where('id', '!=', $produit->vendeur_id)->random()->id,
                        'produit_id' => $produit->id,
                        'montant' => $prix,
                        'date_enchere' => $produit->date_debut->copy()->addHours($index * 3),
                    ]);
                }
                $produit->update(['prix_actuel' => $prix]);
            }
        });
    }
}
