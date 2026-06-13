<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('encheres', function (Blueprint $table) {
            $table->id();
            $table->foreignId('acheteur_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('produit_id')->constrained('produits')->cascadeOnDelete();
            $table->decimal('montant', 12, 2);
            $table->dateTime('date_enchere')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('encheres');
    }
};
