import { Link, router, usePage } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from '@/components/common/StatusBadge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DataTable from '@/components/ui/DataTable';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ProduitTable({ produits }) {
    const user = usePage().props.auth.user;
    const [selected, setSelected] = useState(null);
    const canManage = (row) => user.type === 'ADMIN' || user.id === row.vendeur_id;
    return <><DataTable rows={produits} columns={[{ key: 'libelle', label: 'Produit' }, { key: 'categorie', label: 'Catégorie', render: (row) => row.categorie.nom }, { key: 'vendeur', label: 'Vendeur', render: (row) => row.vendeur.name }, { key: 'prix_actuel', label: 'Prix actuel', render: (row) => <strong>{formatCurrency(row.prix_actuel)}</strong> }, { key: 'statut', label: 'Statut', render: (row) => <StatusBadge status={row.statut} /> }, { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-1"><Link href={route('produits.show', row.id)} className="rounded p-2 hover:bg-slate-100"><Eye className="h-4 w-4" /></Link>{canManage(row) && <><Link href={route('produits.edit', row.id)} className="rounded p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></Link><button onClick={() => setSelected(row)} className="rounded p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></>}</div> }]} /><ConfirmDialog open={Boolean(selected)} onClose={() => setSelected(null)} onConfirm={() => router.delete(route('produits.destroy', selected.id), { onFinish: () => setSelected(null) })} description={`Supprimer le produit « ${selected?.libelle || ''} » et tout son historique d’enchères ?`} /></>;
}
