import { Head } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import ClientForm from '@/components/clients/ClientForm';
import AppLayout from '@/layouts/AppLayout';
export default function Edit({ client }) { return <AppLayout>
    <Head title={`Modifier ${client.name}`} />
    <PageHeader title="Modifier le client" description={client.email} />
    <ClientForm client={client} />
</AppLayout>; }
