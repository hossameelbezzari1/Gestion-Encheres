<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendeur_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('categorie_id')->constrained('categories')->restrictOnDelete();
            $table->string('libelle');
            $table->text('description');
            $table->string('image')->nullable();
            $table->decimal('prix_initial', 12, 2);
            $table->decimal('prix_actuel', 12, 2);
            $table->dateTime('date_debut');
            $table->dateTime('date_fin')->index();
            $table->string('statut')->default('EN_COURS')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
