import { Head } from '@inertiajs/react';
import PageHeader from '@/components/common/PageHeader';
import ProduitForm from '@/components/produits/ProduitForm';
import AppLayout from '@/layouts/AppLayout';
export default function Edit({ produit, categories }) { return <AppLayout><Head title={`Modifier ${produit.libelle}`} /><PageHeader title="Modifier le produit" description={produit.libelle} /><ProduitForm produit={produit} categories={categories} /></AppLayout>; }
