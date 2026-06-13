<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProduitRequest;
use App\Http\Requests\UpdateProduitRequest;
use App\Models\Categorie;
use App\Models\Produit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProduitController extends Controller
{
    public function publicIndex(): Response
    {
        $this->terminerProduitsExpires();

        $produits = Produit::query()
            ->with(['vendeur:id,name', 'categorie:id,nom'])
            ->withCount('encheres')
            ->when(request('search'), fn ($query, $search) => $query
                ->where(fn ($q) => $q->where('libelle', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")))
            ->when(request('categorie'), fn ($query, $categorie) => $query->where('categorie_id', $categorie))
            ->when(request('statut'), fn ($query, $statut) => $query->where('statut', $statut))
            ->orderByRaw("CASE WHEN statut = 'EN_COURS' THEN 0 ELSE 1 END")
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Produits/PublicIndex', [
            'produits' => $produits,
            'categories' => Categorie::orderBy('nom')->get(['id', 'nom']),
            'filters' => request()->only(['search', 'categorie', 'statut']),
        ]);
    }

    public function index(): Response
    {
        $this->terminerProduitsExpires();

        $produits = Produit::query()
            ->with(['vendeur:id,name', 'categorie:id,nom'])
            ->withCount('encheres')
            ->when(request('search'), fn ($query, $search) => $query->where('libelle', 'like', "%{$search}%"))
            ->when(request('categorie'), fn ($query, $categorie) => $query->where('categorie_id', $categorie))
            ->when(request('statut'), fn ($query, $statut) => $query->where('statut', $statut))
            ->latest()->paginate(10)->withQueryString();

        return Inertia::render('Produits/Index', [
            'produits' => $produits,
            'categories' => Categorie::orderBy('nom')->get(['id', 'nom']),
            'filters' => request()->only(['search', 'categorie', 'statut']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Produits/Create', [
            'categories' => Categorie::orderBy('nom')->get(['id', 'nom']),
        ]);
    }

    public function store(StoreProduitRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['image'] = $request->file('image')->store('produits', 'public');
        $data['vendeur_id'] = $request->user()->id;
        $data['prix_actuel'] = $data['prix_initial'];
        $data['date_debut'] = now();
        $data['date_fin'] = now()->addDays(3);
        $data['statut'] = 'EN_COURS';

        $produit = Produit::create($data);

        return to_route('produits.show', $produit)->with('success', 'Produit mis aux enchères avec succès.');
    }

    public function show(Produit $produit): Response
    {
        if ($produit->statut === 'EN_COURS' && $produit->date_fin?->isPast()) {
            $produit->update(['statut' => 'TERMINE']);
        }

        $produit->load([
            'vendeur:id,name',
            'categorie:id,nom',
            'meilleureEnchere.acheteur:id,name',
            'encheres' => fn ($query) => $query->with('acheteur:id,name')->latest('date_enchere'),
        ])->loadCount('encheres');

        return Inertia::render('Produits/Show', ['produit' => $produit]);
    }

    public function edit(Produit $produit): Response
    {
        Gate::authorize('update', $produit);

        return Inertia::render('Produits/Edit', [
            'produit' => $produit,
            'categories' => Categorie::orderBy('nom')->get(['id', 'nom']),
        ]);
    }

    public function update(UpdateProduitRequest $request, Produit $produit): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($produit->image) {
                Storage::disk('public')->delete($produit->image);
            }
            $data['image'] = $request->file('image')->store('produits', 'public');
        }

        $produit->update($data);

        return to_route('produits.index')->with('success', 'Produit modifié avec succès.');
    }

    public function destroy(Produit $produit): RedirectResponse
    {
        Gate::authorize('delete', $produit);

        if ($produit->image) {
            Storage::disk('public')->delete($produit->image);
        }
        $produit->delete();

        return to_route('produits.index')->with('success', 'Produit supprimé avec succès.');
    }

    private function terminerProduitsExpires(): void
    {
        Produit::query()
            ->where('statut', 'EN_COURS')
            ->where('date_fin', '<', now())
            ->update(['statut' => 'TERMINE']);
    }
}
