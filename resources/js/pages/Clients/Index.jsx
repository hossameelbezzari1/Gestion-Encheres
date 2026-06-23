import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import ClientTable from '@/components/clients/ClientTable';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/ui/AppCard';
import Pagination from '@/components/ui/Pagination';
import SearchInput from '@/components/ui/SearchInput';
import AppLayout from '@/layouts/AppLayout';

export default function Index({ clients, filters }) {
    return <AppLayout>
        <Head title="Clients" />
        <PageHeader title="Clients" description="Gérez les utilisateurs de la plateforme." actions={<Link href={route('clients.create')} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950"><Plus className="h-4 w-4" />Nouveau client</Link>} />
        <Card>
            <div className="mb-5 max-w-md">
                <SearchInput value={filters.search} routeName="clients.index" />
            </div>
            <ClientTable clients={clients.data} />
            <Pagination links={clients.links} />
        </Card>
    </AppLayout>;
}

