import { Link } from '@inertiajs/react';
import Button from '@/components/ui/AppButton';

export default function FormActions({ cancelHref, processing, submitLabel = 'Enregistrer' }) {
    return <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><Link href={cancelHref} className="inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100">Annuler</Link><Button type="submit" loading={processing}>{submitLabel}</Button></div>;
}
