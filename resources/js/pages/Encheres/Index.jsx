import { Head } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import EnchereTable from '@/components/encheres/EnchereTable';
import Card from '@/components/ui/AppCard';
import Pagination from '@/components/ui/Pagination';
import AppLayout from '@/layouts/AppLayout';
export default function Index({ encheres }) { return <AppLayout><Head title="Enchères" /><PageHeader title="Toutes les enchères" description="Historique général des offres enregistrées." /><Card><EnchereTable encheres={encheres.data} /><Pagination links={encheres.links} /></Card></AppLayout>; }

