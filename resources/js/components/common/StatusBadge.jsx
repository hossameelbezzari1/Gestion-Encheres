import Badge from '@/components/ui/AppBadge';

export default function StatusBadge({ status }) {
    const variants = { EN_COURS: 'success', TERMINE: 'neutral', VENDU: 'info', ANNULE: 'danger' };
    const labels = { EN_COURS: 'En cours', TERMINE: 'Terminée', VENDU: 'Vendu', ANNULE: 'Annulée' };
    return <Badge variant={variants[status] || 'neutral'}>{labels[status] || status}</Badge>;
}
