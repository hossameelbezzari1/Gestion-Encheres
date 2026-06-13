<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendeur_id',
        'categorie_id',
        'libelle',
        'description',
        'image',
        'prix_initial',
        'prix_actuel',
        'date_debut',
        'date_fin',
        'statut',
    ];

    protected $appends = ['image_url', 'prochain_montant', 'est_expire'];

    protected function casts(): array
    {
        return [
            'prix_initial' => 'decimal:2',
            'prix_actuel' => 'decimal:2',
            'date_debut' => 'datetime',
            'date_fin' => 'datetime',
        ];
    }

    public function vendeur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendeur_id');
    }

    public function categorie(): BelongsTo
    {
        return $this->belongsTo(Categorie::class);
    }

    public function encheres(): HasMany
    {
        return $this->hasMany(Enchere::class);
    }

    public function meilleureEnchere(): HasOne
    {
        return $this->hasOne(Enchere::class)->ofMany('montant', 'max');
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->image ? Storage::url($this->image) : null;
    }

    public function getProchainMontantAttribute(): string
    {
        if ($this->prix_actuel === null) {
            return '0.00';
        }

        return number_format(round((float) $this->prix_actuel * 1.10, 2), 2, '.', '');
    }

    public function getEstExpireAttribute(): bool
    {
        return $this->date_fin?->isPast() ?? false;
    }
}
