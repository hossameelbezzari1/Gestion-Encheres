import ClientForm from '@/components/clients/ClientForm';
import PageHeader from '@/components/common/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
export default function Create() {
    return (
        <AppLayout>
            <Head title="Nouveau client" />
            <PageHeader title="Nouveau client" description="Créez un compte client ou administrateur." />
            <ClientForm />
        </AppLayout>
    );
}
