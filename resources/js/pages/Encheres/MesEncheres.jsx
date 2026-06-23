import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import StatusBadge from '@/components/common/StatusBadge';
import Card from '@/components/ui/AppCard';
import DataTable from '@/components/ui/DataTable';
import AppLayout from '@/layouts/AppLayout';
import { formatCurrency } from '@/lib/formatCurrency';
export default function MesEncheres({ groupes }) { return <AppLayout>
    <Head title="Mes enchères" />
    <PageHeader title="Mes enchères" description="Retrouvez les produits sur lesquels vous avez enchéri." />
    <Card>
        <DataTable keyField="produit.id" rows={groupes} columns={[{ key: 'produit', label: 'Produit', render: (row) => <Link href={route('produits.show', row.produit.id)} className="font-semibold hover:text-amber-700">{row.produit.libelle}</Link> }, { key: 'nombre', label: 'Mes offres' }, { key: 'dernier_montant', label: 'Dernier montant', render: (row) => formatCurrency(row.dernier_montant) }, { key: 'position', label: 'Position', render: (row) => row.meilleur_encherisseur ? <span className="font-semibold text-emerald-600">Meilleure offre</span> : <span className="text-slate-500">Dépassée</span> }, { key: 'statut', label: 'Statut', render: (row) => <StatusBadge status={row.produit.statut} /> }]} />
    </Card>
</AppLayout>; }

