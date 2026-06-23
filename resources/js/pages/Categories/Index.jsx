import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import CategorieTable from '@/components/categories/CategorieTable';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/ui/AppCard';
import Pagination from '@/components/ui/Pagination';
import AppLayout from '@/layouts/AppLayout';
export default function Index({ categories }) { return <AppLayout>
    <Head title="Catégories" />
    <PageHeader title="Catégories" description="Organisez les produits proposés aux enchères." actions={<Link href={route('categories.create')} className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950"><Plus className="h-4 w-4" />Nouvelle catégorie</Link>} />
    <Card>
        <CategorieTable categories={categories.data} />
        <Pagination links={categories.links} />
    </Card>
</AppLayout>; }

