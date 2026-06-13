<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enchere extends Model
{
    use HasFactory;

    protected $fillable = ['acheteur_id', 'produit_id', 'montant', 'date_enchere'];

    protected function casts(): array
    {
        return [
            'montant' => 'decimal:2',
            'date_enchere' => 'datetime',
        ];
    }

    public function acheteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'acheteur_id');
    }

    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class);
    }
}
