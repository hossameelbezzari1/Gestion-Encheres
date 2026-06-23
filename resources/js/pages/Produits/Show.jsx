import StatusBadge from '@/components/common/StatusBadge';
import EnchereHistory from '@/components/encheres/EnchereHistory';
import AuctionCountdown from '@/components/produits/AuctionCountdown';
import EncherirButton from '@/components/produits/EncherirButton';
import PriceDisplay from '@/components/produits/PriceDisplay';
import ProduitImage from '@/components/produits/ProduitImage';
import Card from '@/components/ui/AppCard';
import PublicLayout from '@/layouts/PublicLayout';
import { formatCurrency } from '@/lib/formatCurrency';
import { formatDate } from '@/lib/formatDate';
import { Head } from '@inertiajs/react';
import { CalendarDays, Gavel, Tag, User } from 'lucide-react';

export default function Show({ produit }) {
    return (
        <PublicLayout>
            <Head title={produit.libelle} />
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
                    <div>
                        <div className="overflow-hidden rounded-xl border bg-white">
                            <ProduitImage src={produit.image_url} alt={produit.libelle} className="h-[320px] w-full md:h-[520px]" />
                        </div>
                        <Card title="Description" className="mt-6">
                            <p className="leading-7 whitespace-pre-line text-slate-600">{produit.description}</p>
                        </Card>
                        <Card title={`Historique des enchères (${produit.encheres_count})`} className="mt-6">
                            <EnchereHistory encheres={produit.encheres} />
                        </Card>
                    </div>
                    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
                        <Card>
                            <div className="flex items-center justify-between">
                                <StatusBadge status={produit.statut} />
                                <AuctionCountdown endDate={produit.date_fin} />
                            </div>
                            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">{produit.libelle}</h1>
                            <div className="mt-4 grid gap-3 text-sm text-slate-600">
                                <span className="flex items-center gap-2">
                                    <Tag className="h-4 w-4 text-amber-600" />
                                    {produit.categorie.nom}
                                </span>
                                <span className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-amber-600" />
                                    Vendu par {produit.vendeur.name}
                                </span>
                                <span className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-amber-600" />
                                    Du {formatDate(produit.date_debut)} au {formatDate(produit.date_fin)}
                                </span>
                            </div>
                            <div className="my-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                                <PriceDisplay label="Prix initial" value={produit.prix_initial} />
                                <PriceDisplay label="Prix actuel" value={produit.prix_actuel} emphasized />
                            </div>
                            <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                                <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase">Prochaine enchère</p>
                                <p className="mt-1 text-2xl font-bold text-slate-950">{formatCurrency(produit.prochain_montant)}</p>
                            </div>
                            <EncherirButton produit={produit} />
                        </Card>
                        {produit.meilleure_enchere && (
                            <Card>
                                <div className="flex items-center gap-3">
                                    <span className="rounded-lg bg-amber-100 p-3 text-amber-700">
                                        <Gavel className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase">Meilleure enchère</p>
                                        <p className="font-bold text-slate-900">{formatCurrency(produit.meilleure_enchere.montant)}</p>
                                        <p className="text-sm text-slate-500">par {produit.meilleure_enchere.acheteur.name}</p>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </aside>
                </div>
            </div>
        </PublicLayout>
    );
}
