import CategorieForm from '@/components/categories/CategorieForm';
import PageHeader from '@/components/common/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
export default function Create() {
    return (
        <AppLayout>
            <Head title="Nouvelle catégorie" />
            <PageHeader title="Nouvelle catégorie" description="Ajoutez une catégorie pour classer les produits." />
            <CategorieForm />
        </AppLayout>
    );
}
