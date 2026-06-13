<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategorieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:255', Rule::unique('categories')->ignore($this->route('category'))],
            'description' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
