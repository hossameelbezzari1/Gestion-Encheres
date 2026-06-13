import Button from './AppButton';
import Modal from './Modal';

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'Confirmer la suppression', description, processing }) {
    return (
        <Modal open={open} onClose={onClose} title={title} footer={<><Button variant="ghost" onClick={onClose}>Annuler</Button><Button variant="danger" loading={processing} onClick={onConfirm}>Confirmer</Button></>}>
            <p className="text-sm leading-6 text-slate-600">{description}</p>
        </Modal>
    );
}
