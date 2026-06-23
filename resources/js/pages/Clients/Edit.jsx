import ClientForm from '@/components/clients/ClientForm';
import PageHeader from '@/components/common/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
export default function Edit({ client }) {
    return (
        <AppLayout>
            <Head title={`Modifier ${client.name}`} />
            <PageHeader title="Modifier le client" description={client.email} />
            <ClientForm client={client} />
        </AppLayout>
    );
}
