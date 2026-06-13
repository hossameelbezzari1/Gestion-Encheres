<?php

namespace App\Http\Controllers;

use App\Models\Enchere;
use App\Models\Produit;
use App\Services\EnchereService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EnchereController extends Controller
{
    public function __construct(private readonly EnchereService $enchereService)
    {
    }

    public function store(Produit $produit): RedirectResponse
    {
        $enchere = $this->enchereService->encherir($produit, request()->user());

        return back()->with('success', sprintf(
            'Votre enchère de %s DH a été enregistrée.',
            number_format((float) $enchere->montant, 2, ',', ' ')
        ));
    }

    public function index(): Response
    {
        return Inertia::render('Encheres/Index', [
            'encheres' => Enchere::with([
                'acheteur:id,name',
                'produit:id,libelle,vendeur_id,statut,image,prix_actuel,date_fin',
                'produit.vendeur:id,name',
            ])->latest('date_enchere')->paginate(15),
        ]);
    }

    public function mine(): Response
    {
        $groupes = Enchere::query()
            ->where('acheteur_id', request()->user()->id)
            ->with(['produit.vendeur:id,name', 'produit.meilleureEnchere'])
            ->latest('date_enchere')
            ->get()
            ->groupBy('produit_id')
            ->map(function ($encheres) {
                $derniere = $encheres->first();

                return [
                    'produit' => $derniere->produit,
                    'nombre' => $encheres->count(),
                    'dernier_montant' => $derniere->montant,
                    'meilleur_encherisseur' => $derniere->produit->meilleureEnchere?->acheteur_id === request()->user()->id,
                ];
            })->values();

        return Inertia::render('Encheres/MesEncheres', ['groupes' => $groupes]);
    }
}
