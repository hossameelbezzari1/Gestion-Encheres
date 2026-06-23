import Button from '@/components/ui/AppButton';
import Modal from '@/components/ui/Modal';
import { formatCurrency } from '@/lib/formatCurrency';
import { router, usePage } from '@inertiajs/react';
import { Gavel } from 'lucide-react';
import { useState } from 'react';

export default function EncherirButton({ produit }) {
    const user = usePage().props.auth?.user;
    const [open, setOpen] = useState(false);
    const [processing, setProcessing] = useState(false);
    const disabled = produit.statut !== 'EN_COURS' || produit.est_expire || user?.id === produit.vendeur_id;
    const click = () => (user ? setOpen(true) : router.get(route('login')));
    const confirm = () => {
        setProcessing(true);
        router.post(
            route('produits.encherir', produit.id),
            {},
            { preserveScroll: true, onSuccess: () => setOpen(false), onFinish: () => setProcessing(false) },
        );
    };
    return (
        <>
            <Button size="lg" className="w-full" disabled={disabled} onClick={click}>
                <Gavel className="h-5 w-5" />
                {user?.id === produit.vendeur_id
                    ? 'Votre propre produit'
                    : produit.statut === 'EN_COURS' && !produit.est_expire
                      ? 'Enchérir maintenant'
                      : 'Enchère terminée'}
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Confirmer votre enchère"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button loading={processing} onClick={confirm}>
                            Confirmer l’enchère
                        </Button>
                    </>
                }
            >
                <p className="text-slate-600">
                    Confirmez-vous une nouvelle enchère de <strong className="text-slate-950">{formatCurrency(produit.prochain_montant)}</strong> ?
                </p>
                <p className="mt-3 text-xs text-slate-500">Le montant final sera recalculé et sécurisé par le serveur au moment de l’envoi.</p>
            </Modal>
        </>
    );
}
