import { Head } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import ClientForm from '@/components/clients/ClientForm';
import AppLayout from '@/layouts/AppLayout';
export default function Create() { return <AppLayout>
    <Head title="Nouveau client" />
    <PageHeader title="Nouveau client" description="Créez un compte client ou administrateur." />
    <ClientForm />
</AppLayout>; }
