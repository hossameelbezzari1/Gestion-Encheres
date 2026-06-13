<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CategorieController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Categories/Index', [
            'categories' => Categorie::withCount('produits')->latest()->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(StoreCategorieRequest $request): RedirectResponse
    {
        Categorie::create($request->validated());

        return to_route('categories.index')->with('success', 'Catégorie créée avec succès.');
    }

    public function edit(Categorie $category): Response
    {
        return Inertia::render('Categories/Edit', ['categorie' => $category]);
    }

    public function update(UpdateCategorieRequest $request, Categorie $category): RedirectResponse
    {
        $category->update($request->validated());

        return to_route('categories.index')->with('success', 'Catégorie modifiée avec succès.');
    }

    public function destroy(Categorie $category): RedirectResponse
    {
        if ($category->produits()->exists()) {
            return back()->with('error', 'Cette catégorie contient des produits et ne peut pas être supprimée.');
        }
        $category->delete();

        return to_route('categories.index')->with('success', 'Catégorie supprimée avec succès.');
    }
}
