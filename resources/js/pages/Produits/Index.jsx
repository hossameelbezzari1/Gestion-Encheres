import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import ProduitTable from '@/components/produits/ProduitTable';
import Card from '@/components/ui/AppCard';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/FormSelect';
import AppLayout from '@/layouts/AppLayout';
export default function Index({ produits, categories, filters }) { const change = (key, value) => router.get(route('produits.index'), { ...filters, [key]: value || undefined }, { preserveState: true, replace: true }); return <AppLayout><Head title="Produits" /><PageHeader title="Produits" description="Gérez les ventes et leur état." actions={<Link href={route('produits.create')} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950"><Plus className="h-4 w-4" />Ajouter un produit</Link>} /><Card><div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px_190px]"><SearchInput value={filters.search} routeName="produits.index" params={{ categorie: filters.categorie, statut: filters.statut }} /><Select value={filters.categorie || ''} onChange={(e) => change('categorie', e.target.value)} options={categories.map((item) => ({ value: item.id, label: item.nom }))} placeholder="Toutes les catégories" /><Select value={filters.statut || ''} onChange={(e) => change('statut', e.target.value)} options={[{ value: 'EN_COURS', label: 'En cours' }, { value: 'TERMINE', label: 'Terminé' }, { value: 'VENDU', label: 'Vendu' }, { value: 'ANNULE', label: 'Annulé' }]} placeholder="Tous les statuts" /></div><ProduitTable produits={produits.data} /><Pagination links={produits.links} /></Card></AppLayout>; }

