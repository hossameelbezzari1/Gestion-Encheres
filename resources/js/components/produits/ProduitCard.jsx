import { Link } from '@inertiajs/react';
import { ArrowRight, User } from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';
import Badge from '@/components/ui/AppBadge';
import AuctionCountdown from './AuctionCountdown';
import PriceDisplay from './PriceDisplay';
import ProduitImage from './ProduitImage';

export default function ProduitCard({ produit }) {
    return <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"><div className="relative"><ProduitImage src={produit.image_url} alt={produit.libelle} /><div className="absolute left-3 top-3"><Badge variant="warning">{produit.categorie.nom}</Badge></div><div className="absolute right-3 top-3"><StatusBadge status={produit.statut} /></div></div><div className="p-5"><h2 className="line-clamp-1 text-lg font-bold text-slate-950 dark:text-white">{produit.libelle}</h2><p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500 dark:text-slate-400">{produit.description}</p><div className="mt-4 flex items-center justify-between border-y border-slate-100 py-4 dark:border-slate-800"><PriceDisplay label="Prix initial" value={produit.prix_initial} /><PriceDisplay label="Prix actuel" value={produit.prix_actuel} emphasized /></div><div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" />{produit.vendeur.name}</span><AuctionCountdown endDate={produit.date_fin} /></div><Link href={route('produits.show', produit.id)} className="mt-5 flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300">Voir les détails <ArrowRight className="h-4 w-4" /></Link></div></article>;
}
