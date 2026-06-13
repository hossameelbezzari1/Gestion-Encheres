import { Head, Link } from '@inertiajs/react';
import { Gavel, Package, Pencil } from 'lucide-react';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import Card from '@/components/ui/AppCard';
import AppLayout from '@/layouts/AppLayout';
export default function Show({ client }) { return <AppLayout><Head title={client.name} /><PageHeader title={client.name} description={client.email} actions={<Link href={route('clients.edit', client.id)} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><Pencil className="h-4 w-4" />Modifier</Link>} /><div className="grid gap-4 sm:grid-cols-2"><StatCard label="Produits proposés" value={client.produits_vendues_count} icon={Package} /><StatCard label="Enchères effectuées" value={client.encheres_count} icon={Gavel} accent="emerald" /></div><Card title="Coordonnées" className="mt-6"><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="text-xs uppercase text-slate-500">E-mail</dt><dd className="mt-1 font-medium">{client.email}</dd></div><div><dt className="text-xs uppercase text-slate-500">Téléphone</dt><dd className="mt-1 font-medium">{client.telephone || 'Non renseigné'}</dd></div><div><dt className="text-xs uppercase text-slate-500">Type</dt><dd className="mt-1 font-medium">{client.type}</dd></div></dl></Card></AppLayout>; }

