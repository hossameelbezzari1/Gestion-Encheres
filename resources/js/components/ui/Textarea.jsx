import { cn } from '@/lib/cn';

export default function Textarea({ label, error, required, rows = 5, className, id, ...props }) {
    const inputId = id || props.name;
    return (
        <label className="block" htmlFor={inputId}>
            {label && <span className="mb-1.5 block text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</span>}
            <textarea id={inputId} rows={rows} required={required} className={cn('w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200', error && 'border-red-500', className)} {...props} />
            {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
        </label>
    );
}
