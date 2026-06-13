import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const variants = {
    primary: 'bg-amber-500 text-slate-950 hover:bg-amber-400 focus:ring-amber-500',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
};

const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' };

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    className,
    children,
    type = 'button',
    ...props
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-55',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
}
