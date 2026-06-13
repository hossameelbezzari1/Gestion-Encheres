import { Head, Link } from '@inertiajs/react';
import { Boxes, Gavel, Hourglass, Plus, Tags, Trophy, Users } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import StatusBadge from '@/components/common/StatusBadge';
import Card from '@/components/ui/AppCard';
import AppLayout from '@/layouts/AppLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { formatDate } from '@/lib/formatDate';

export default function Dashboard({ stats, derniersProduits, dernieresEncheres, expirations }) {
    const actionClass = 'inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800';
    return <AppLayout><Head title="Tableau de bord" /><PageHeader title="Tableau de bord" description="Vue d’ensemble de l’activité de la plateforme." actions={<Link href={route('produits.create')} className={actionClass}><Plus className="h-4 w-4" />Ajouter un produit</Link>} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Clients" value={stats.clients} icon={Users} accent="sky" /><StatCard label="Catégories" value={stats.categories} icon={Tags} /><StatCard label="Produits" value={stats.produits} icon={Boxes} accent="slate" /><StatCard label="Enchères" value={stats.encheres} icon={Gavel} accent="emerald" /><StatCard label="En cours" value={stats.enCours} icon={Hourglass} /><StatCard label="Terminés" value={stats.termines} icon={Hourglass} accent="slate" /><StatCard label="Meilleure enchère" value={formatCurrency(stats.meilleureEnchere)} icon={Trophy} accent="emerald" /></div><div className="mt-6 grid gap-6 xl:grid-cols-2"><Card title="Derniers produits">{derniersProduits.map((item) => <div key={item.id} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"><div><Link href={route('produits.show', item.id)} className="font-semibold hover:text-amber-700">{item.libelle}</Link><p className="text-xs text-slate-500">{item.categorie.nom} · {item.vendeur.name}</p></div><StatusBadge status={item.statut} /></div>)}</Card><Card title="Dernières enchères">{dernieresEncheres.map((item) => <div key={item.id} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"><div><p className="font-semibold">{item.acheteur.name}</p><p className="text-xs text-slate-500">{item.produit.libelle} · {formatDate(item.date_enchere)}</p></div><strong className="text-amber-700">{formatCurrency(item.montant)}</strong></div>)}</Card><Card title="Expirations proches" className="xl:col-span-2">{expirations.map((item) => <div key={item.id} className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0"><span className="font-medium">{item.libelle}</span><span className="text-sm text-slate-500">{formatDate(item.date_fin)}</span></div>)}</Card></div></AppLayout>;
}

