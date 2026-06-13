import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DataTable from '@/components/ui/DataTable';

export default function CategorieTable({ categories }) {
    const [selected, setSelected] = useState(null);
    return <><DataTable rows={categories} columns={[{ key: 'nom', label: 'Nom' }, { key: 'description', label: 'Description', render: (row) => <span className="block max-w-md truncate">{row.description || '—'}</span> }, { key: 'produits_count', label: 'Produits' }, { key: 'actions', label: 'Actions', render: (row) => <div className="flex gap-1"><Link href={route('categories.edit', row.id)} className="rounded p-2 hover:bg-slate-100"><Pencil className="h-4 w-4" /></Link><button onClick={() => setSelected(row)} className="rounded p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button></div> }]} /><ConfirmDialog open={Boolean(selected)} onClose={() => setSelected(null)} onConfirm={() => router.delete(route('categories.destroy', selected.id), { onFinish: () => setSelected(null) })} description={`Supprimer la catégorie « ${selected?.nom || ''} » ?`} /></>;
}
