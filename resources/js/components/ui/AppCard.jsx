import { cn } from '@/lib/cn';

export default function Card({ title, description, actions, footer, children, className }) {
    return (
        <section className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)}>
            {(title || description || actions) && (
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
                    <div><h2 className="font-semibold text-slate-900">{title}</h2>{description && <p className="mt-1 text-sm text-slate-500">{description}</p>}</div>
                    {actions}
                </div>
            )}
            <div className="p-5">{children}</div>
            {footer && <div className="border-t border-slate-100 px-5 py-4">{footer}</div>}
        </section>
    );
}
