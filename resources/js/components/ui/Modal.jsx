import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, footer }) {
    useEffect(() => {
        const close = (event) => event.key === 'Escape' && onClose();
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, [onClose]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm" onMouseDown={onClose}>
            <div className="w-full max-w-lg rounded-xl bg-white text-slate-900 shadow-2xl dark:border dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100" onMouseDown={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                    <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
                    <button onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"><X className="h-5 w-5" /></button>
                </div>
                <div className="p-5">{children}</div>
                {footer && <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 dark:border-slate-800">{footer}</div>}
            </div>
        </div>
    );
}
