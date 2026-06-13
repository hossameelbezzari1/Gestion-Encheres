import { FolderKanban, Gavel, Globe2, LayoutDashboard, ListChecks, Tags, Users } from 'lucide-react';

export const navigation = [
    { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Clients', href: '/clients', icon: Users },
    { label: 'Catégories', href: '/categories', icon: Tags },
    { label: 'Produits', href: '/produits', icon: FolderKanban },
    { label: 'Enchères', href: '/encheres', icon: Gavel },
    { label: 'Mes enchères', href: '/mes-encheres', icon: ListChecks },
    { label: 'Site public', href: '/', icon: Globe2 },
];
