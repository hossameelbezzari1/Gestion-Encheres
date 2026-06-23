import { formatCurrency } from '@/lib/formatCurrency';

export default function PriceDisplay({ label, value, emphasized = false }) {
    return (
        <div>
            <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">{label}</p>
            <p className={emphasized ? 'mt-1 text-2xl font-bold text-amber-600' : 'mt-1 font-semibold text-slate-900'}>{formatCurrency(value)}</p>
        </div>
    );
}
