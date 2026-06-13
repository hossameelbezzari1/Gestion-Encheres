import { cn } from '@/lib/cn';

const variants = {
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    danger: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300',
    info: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
};

export default function Badge({ variant = 'neutral', children, className }) {
    return <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', variants[variant], className)}>{children}</span>;
}
