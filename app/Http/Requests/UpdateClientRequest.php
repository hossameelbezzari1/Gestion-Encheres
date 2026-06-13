<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($this->route('client'))],
            'telephone' => ['nullable', 'string', 'max:30'],
            'type' => ['required', 'in:CLIENT,ADMIN'],
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ];
    }
}
