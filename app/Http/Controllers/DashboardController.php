<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Enchere;
use App\Models\Produit;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        Produit::query()
            ->where('statut', 'EN_COURS')
            ->where('date_fin', '<', now())
            ->update(['statut' => 'TERMINE']);

        return Inertia::render('Dashboard', [
            'stats' => [
                'clients' => User::where('type', 'CLIENT')->count(),
                'categories' => Categorie::count(),
                'produits' => Produit::count(),
                'enCours' => Produit::where('statut', 'EN_COURS')->count(),
                'termines' => Produit::where('statut', 'TERMINE')->count(),
                'encheres' => Enchere::count(),
                'meilleureEnchere' => Enchere::max('montant') ?? 0,
            ],
            'derniersProduits' => Produit::with(['vendeur:id,name', 'categorie:id,nom'])
                ->latest()->limit(5)->get(),
            'dernieresEncheres' => Enchere::with([
                'acheteur:id,name',
                'produit:id,libelle,image,prix_actuel,date_fin',
            ])
                ->latest('date_enchere')->limit(5)->get(),
            'expirations' => Produit::with('categorie:id,nom')
                ->where('statut', 'EN_COURS')->orderBy('date_fin')->limit(5)->get(),
        ]);
    }
}
