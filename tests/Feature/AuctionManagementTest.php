<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Enchere;
use App\Models\Produit;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuctionManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_create_a_product_with_expected_business_values(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $categorie = Categorie::factory()->create();
        $now = now()->startOfSecond();
        $this->travelTo($now);

        $response = $this->actingAs($user)->post(route('produits.store'), [
            'libelle' => 'Montre vintage',
            'description' => 'Une montre de collection en excellent état.',
            'image' => UploadedFile::fake()->createWithContent(
                'montre.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=')
            ),
            'prix_initial' => 1000,
            'categorie_id' => $categorie->id,
        ]);

        $produit = Produit::firstOrFail();
        $response->assertRedirect(route('produits.show', $produit));
        $this->assertSame('1000.00', $produit->prix_actuel);
        $this->assertTrue($produit->date_debut->equalTo($now));
        $this->assertTrue($produit->date_fin->equalTo($now->copy()->addDays(3)));
        $this->assertSame('EN_COURS', $produit->statut);
    }

    public function test_a_guest_cannot_bid(): void
    {
        $produit = Produit::factory()->create();
        $this->post(route('produits.encherir', $produit))->assertRedirect(route('login'));
        $this->assertDatabaseCount('encheres', 0);
    }

    public function test_the_seller_cannot_bid_on_their_product(): void
    {
        $vendeur = User::factory()->create();
        $produit = Produit::factory()->for($vendeur, 'vendeur')->create();
        $this->actingAs($vendeur)->post(route('produits.encherir', $produit))
            ->assertSessionHasErrors('enchere');
        $this->assertDatabaseCount('encheres', 0);
    }

    public function test_an_expired_product_rejects_a_bid_and_becomes_finished(): void
    {
        $acheteur = User::factory()->create();
        $produit = Produit::factory()->create([
            'date_fin' => now()->subMinute(),
            'statut' => 'EN_COURS',
        ]);
        $this->actingAs($acheteur)->post(route('produits.encherir', $produit))
            ->assertSessionHasErrors('enchere');
        $this->assertSame('TERMINE', $produit->fresh()->statut);
        $this->assertDatabaseCount('encheres', 0);
    }

    public function test_each_click_increases_price_by_ten_percent_and_creates_a_row(): void
    {
        $acheteur = User::factory()->create();
        $produit = Produit::factory()->create([
            'prix_initial' => 1000,
            'prix_actuel' => 1000,
            'date_fin' => now()->addDay(),
        ]);

        $this->actingAs($acheteur)->post(route('produits.encherir', $produit))->assertSessionHas('success');
        $this->actingAs($acheteur)->post(route('produits.encherir', $produit))->assertSessionHas('success');
        $this->actingAs($acheteur)->post(route('produits.encherir', $produit))->assertSessionHas('success');

        $this->assertSame(['1100.00', '1210.00', '1331.00'], Enchere::pluck('montant')->all());
        $this->assertSame('1331.00', $produit->fresh()->prix_actuel);
    }

    public function test_only_the_owner_or_an_administrator_can_edit_a_product(): void
    {
        $proprietaire = User::factory()->create();
        $intrus = User::factory()->create();
        $admin = User::factory()->admin()->create();
        $produit = Produit::factory()->for($proprietaire, 'vendeur')->create();

        $this->actingAs($intrus)->get(route('produits.edit', $produit))->assertForbidden();
        $this->actingAs($proprietaire)->get(route('produits.edit', $produit))->assertOk();
        $this->actingAs($admin)->get(route('produits.edit', $produit))->assertOk();
    }

    public function test_dashboard_serializes_latest_bids_without_missing_product_dates(): void
    {
        $user = User::factory()->create();
        $produit = Produit::factory()->create();
        Enchere::factory()->for($produit)->create();

        $this->actingAs($user)->get(route('dashboard'))->assertOk();
    }

    public function test_bid_index_serializes_partially_selected_products_safely(): void
    {
        $user = User::factory()->create();
        $produit = Produit::factory()->create();
        Enchere::factory()->for($produit)->create();

        $this->actingAs($user)->get(route('encheres.index'))->assertOk();
    }
}
