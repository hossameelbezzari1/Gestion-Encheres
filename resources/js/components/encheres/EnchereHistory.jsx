import EmptyState from '@/components/ui/EmptyState';
import { formatCurrency } from '@/lib/formatCurrency';
import { formatDate } from '@/lib/formatDate';

export default function EnchereHistory({ encheres }) {
    if (!encheres.length) return <EmptyState title="Aucune enchère" description="Soyez la première personne à enchérir sur ce produit." />;
    return (
        <div className="divide-y divide-slate-100">
            {encheres.map((enchere, index) => (
                <div key={enchere.id} className="flex items-center justify-between py-3">
                    <div>
                        <p className="font-semibold text-slate-800">{enchere.acheteur.name}</p>
                        <p className="text-xs text-slate-500">{formatDate(enchere.date_enchere)}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-amber-600">{formatCurrency(enchere.montant)}</p>
                        {index === 0 && <p className="text-xs font-medium text-emerald-600">Meilleure enchère</p>}
                    </div>
                </div>
            ))}
        </div>
    );
}
