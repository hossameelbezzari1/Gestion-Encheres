<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ClientController extends Controller
{
    public function index(): Response
    {
        $clients = User::query()
            ->when(request('search'), fn ($query, $search) => $query
                ->where(fn ($q) => $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")))
            ->latest()->paginate(10)->withQueryString();

        return Inertia::render('Clients/Index', [
            'clients' => $clients,
            'filters' => request()->only('search'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Clients/Create');
    }

    public function store(StoreClientRequest $request): RedirectResponse
    {
        User::create($request->validated());

        return to_route('clients.index')->with('success', 'Client créé avec succès.');
    }

    public function show(User $client): Response
    {
        return Inertia::render('Clients/Show', [
            'client' => $client->loadCount(['produitsVendues', 'encheres']),
        ]);
    }

    public function edit(User $client): Response
    {
        return Inertia::render('Clients/Edit', ['client' => $client]);
    }

    public function update(UpdateClientRequest $request, User $client): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }
        $client->update($data);

        return to_route('clients.index')->with('success', 'Client modifié avec succès.');
    }

    public function destroy(User $client): RedirectResponse
    {
        abort_if($client->is(request()->user()), 422, 'Vous ne pouvez pas supprimer votre propre compte.');
        $client->delete();

        return to_route('clients.index')->with('success', 'Client supprimé avec succès.');
    }
}
