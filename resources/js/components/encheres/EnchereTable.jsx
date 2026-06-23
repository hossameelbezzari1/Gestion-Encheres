import StatusBadge from '@/components/common/StatusBadge';
import DataTable from '@/components/ui/DataTable';
import { formatCurrency } from '@/lib/formatCurrency';
import { formatDate } from '@/lib/formatDate';

export default function EnchereTable({ encheres }) {
    return (
        <DataTable
            rows={encheres}
            columns={[
                { key: 'acheteur', label: 'Acheteur', render: (row) => row.acheteur.name },
                { key: 'produit', label: 'Produit', render: (row) => row.produit.libelle },
                { key: 'vendeur', label: 'Vendeur', render: (row) => row.produit.vendeur.name },
                { key: 'montant', label: 'Montant', render: (row) => <strong className="text-amber-700">{formatCurrency(row.montant)}</strong> },
                { key: 'date', label: 'Date', render: (row) => formatDate(row.date_enchere) },
                { key: 'statut', label: 'Statut', render: (row) => <StatusBadge status={row.produit.statut} /> },
            ]}
        />
    );
}
