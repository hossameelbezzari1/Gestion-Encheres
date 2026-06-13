import { cn } from '@/lib/cn';

export default function Card({ title, description, actions, footer, children, className }) {
    return (
        <section className={cn('rounded-xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900', className)}>
            {(title || description || actions) && (
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                    <div><h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}</div>
                    {actions}
                </div>
            )}
            <div className="p-5">{children}</div>
            {footer && <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800">{footer}</div>}
        </section>
    );
}
