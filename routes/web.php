<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnchereController;
use App\Http\Controllers\ProduitController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProduitController::class, 'publicIndex'])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('clients', ClientController::class);
    Route::resource('categories', CategorieController::class)->except('show');
    Route::resource('produits', ProduitController::class)->except('show');
    Route::post('/produits/{produit}/encherir', [EnchereController::class, 'store'])->name('produits.encherir');
    Route::get('/encheres', [EnchereController::class, 'index'])->name('encheres.index');
    Route::get('/mes-encheres', [EnchereController::class, 'mine'])->name('encheres.mine');
});

Route::get('/produits/{produit}', [ProduitController::class, 'show'])->name('produits.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
