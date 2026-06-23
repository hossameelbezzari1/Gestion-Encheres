import { Head, router } from '@inertiajs/react';
import { Gavel, ShieldCheck, Timer } from 'lucide-react';
import ProduitGrid from '@/components/produits/ProduitGrid';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/FormSelect';
import PublicLayout from '@/layouts/PublicLayout';

export default function PublicIndex({ produits, categories, filters }) {
    const updateFilter = (key, value) => router.get(route('home'), { ...filters, [key]: value || undefined }, { preserveState: true, replace: true });
    return <PublicLayout><Head title="Ventes aux enchères" />
        <section className="bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-300"><Gavel className="h-4 w-4" />La bonne affaire est à un clic</span>
                <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Découvrez, enchérissez et remportez des pièces uniques.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Une plateforme simple et transparente pour vendre vos produits et suivre chaque enchère en temps réel.</p><div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300"><span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-amber-400" />Montants sécurisés côté serveur</span><span className="flex items-center gap-2"><Timer className="h-5 w-5 text-amber-400" />Ventes limitées à 3 jours</span></div></div>
        </section><section className="mx-auto max-w-7xl px-4 py-10"><div className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_240px_200px]"><SearchInput value={filters.search} routeName="home" params={{ categorie: filters.categorie, statut: filters.statut }} placeholder="Rechercher un produit…" /><Select value={filters.categorie || ''} onChange={(e) => updateFilter('categorie', e.target.value)} options={categories.map((item) => ({ value: item.id, label: item.nom }))} placeholder="Toutes les catégories" /><Select value={filters.statut || ''} onChange={(e) => updateFilter('statut', e.target.value)} options={[{ value: 'EN_COURS', label: 'En cours' }, { value: 'TERMINE', label: 'Terminées' }, { value: 'VENDU', label: 'Vendues' }, { value: 'ANNULE', label: 'Annulées' }]} placeholder="Tous les statuts" /></div><div className="mb-6"><h2 className="text-2xl font-bold text-slate-950">Produits aux enchères</h2><p className="mt-1 text-sm text-slate-500">{produits.total} produit(s) disponible(s)</p></div><ProduitGrid produits={produits.data} /><Pagination links={produits.links} /></section></PublicLayout>;
}

