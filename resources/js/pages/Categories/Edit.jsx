import CategorieForm from '@/components/categories/CategorieForm';
import PageHeader from '@/components/common/PageHeader';
import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
export default function Edit({ categorie }) {
    return;
    <AppLayout>
        <Head title={`Modifier ${categorie.nom}`} />
        <PageHeader title="Modifier la catégorie" description={categorie.nom} />
        <CategorieForm categorie={categorie} />
    </AppLayout>;
}
