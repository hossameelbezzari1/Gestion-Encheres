import Badge from '@/components/ui/AppBadge';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import DataTable from '@/components/ui/DataTable';
import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ClientTable({ clients }) {
    const [selected, setSelected] = useState(null);
    const [processing, setProcessing] = useState(false);
    const remove = () =>
        router.delete(route('clients.destroy', selected.id), {
            onStart: () => setProcessing(true),
            onFinish: () => {
                setProcessing(false);
                setSelected(null);
            },
        });
    return (
        <>
            <DataTable
                rows={clients}
                columns={[
                    { key: 'name', label: 'Nom' },
                    { key: 'email', label: 'E-mail' },
                    { key: 'telephone', label: 'Téléphone', render: (row) => row.telephone || '—' },
                    { key: 'type', label: 'Type', render: (row) => <Badge variant={row.type === 'ADMIN' ? 'warning' : 'info'}>{row.type}</Badge> },
                    {
                        key: 'actions',
                        label: 'Actions',
                        render: (row) => (
                            <div className="flex gap-1">
                                <Link href={route('clients.show', row.id)} className="rounded p-2 hover:bg-slate-100">
                                    <Eye className="h-4 w-4" />
                                </Link>
                                <Link href={route('clients.edit', row.id)} className="rounded p-2 hover:bg-slate-100">
                                    <Pencil className="h-4 w-4" />
                                </Link>
                                <button onClick={() => setSelected(row)} className="rounded p-2 text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
            <ConfirmDialog
                open={Boolean(selected)}
                onClose={() => setSelected(null)}
                onConfirm={remove}
                processing={processing}
                description={`Supprimer définitivement le compte de ${selected?.name || ''} et ses données associées ?`}
            />
        </>
    );
}
