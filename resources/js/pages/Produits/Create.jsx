import { Head } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import ProduitForm from '@/components/produits/ProduitForm';
import AppLayout from '@/layouts/AppLayout';
export default function Create({ categories }) { return <AppLayout><Head title="Ajouter un produit" /><PageHeader title="Ajouter un produit" description="La vente démarrera immédiatement et se terminera dans 3 jours." /><ProduitForm categories={categories} /></AppLayout>; }
