import { cn } from '@/lib/cn';

export default function Select({ label, error, options = [], placeholder, required, className, id, ...props }) {
    const inputId = id || props.name;
    return (
        <label className="block" htmlFor={inputId}>
            {label && <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label} {required && <span className="text-red-500">*</span>}</span>}
            <select
                id={inputId}
                required={required}
                className={cn('h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-amber-400 dark:focus:ring-amber-900/50', error && 'border-red-500', className)}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
        </label>
    );
}
