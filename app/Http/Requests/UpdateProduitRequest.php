<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('produit')) ?? false;
    }

    public function rules(): array
    {
        return [
            'libelle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:10000'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'prix_initial' => ['required', 'numeric', 'gt:0', 'max:9999999999.99'],
            'categorie_id' => ['required', 'exists:categories,id'],
            'statut' => ['required', 'in:EN_COURS,TERMINE,VENDU,ANNULE'],
        ];
    }
}
