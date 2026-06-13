<?php

namespace App\Services;

use App\Models\Enchere;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class EnchereService
{
    public function encherir(Produit $produit, User $acheteur): Enchere
    {
        $resultat = DB::transaction(function () use ($produit, $acheteur) {
            $produitVerrouille = Produit::query()->lockForUpdate()->findOrFail($produit->id);

            if ($produitVerrouille->statut !== 'EN_COURS') {
                throw ValidationException::withMessages([
                    'enchere' => 'Ce produit ne peut plus recevoir d’enchères.',
                ]);
            }

            if ($produitVerrouille->date_fin === null || $produitVerrouille->date_fin->isPast()) {
                $produitVerrouille->update(['statut' => 'TERMINE']);
                return null;
            }

            if ($produitVerrouille->vendeur_id === $acheteur->id) {
                throw ValidationException::withMessages([
                    'enchere' => 'Vous ne pouvez pas enchérir sur votre propre produit.',
                ]);
            }

            $nouveauMontant = round((float) $produitVerrouille->prix_actuel * 1.10, 2);

            $enchere = $produitVerrouille->encheres()->create([
                'acheteur_id' => $acheteur->id,
                'montant' => $nouveauMontant,
                'date_enchere' => now(),
            ]);

            $produitVerrouille->update(['prix_actuel' => $nouveauMontant]);

            return $enchere;
        }, 3);

        if ($resultat === null) {
            throw ValidationException::withMessages([
                'enchere' => 'Cette vente aux enchères est terminée.',
            ]);
        }

        return $resultat;
    }
}
