import EmptyState from '@/components/ui/EmptyState';
import ProduitCard from './ProduitCard';

export default function ProduitGrid({ produits }) {
    if (!produits.length)
        return (
            <EmptyState title="Aucun produit trouvé" description="Modifiez les filtres ou revenez bientôt pour découvrir de nouvelles enchères." />
        );
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produits.map((produit) => (
                <ProduitCard key={produit.id} produit={produit} />
            ))}
        </div>
    );
}
