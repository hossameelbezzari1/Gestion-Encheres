import { usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const config = {
    success: { icon: CheckCircle2, style: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
    error: { icon: XCircle, style: 'border-red-200 bg-red-50 text-red-800' },
    warning: { icon: AlertCircle, style: 'border-amber-200 bg-amber-50 text-amber-800' },
    info: { icon: Info, style: 'border-sky-200 bg-sky-50 text-sky-800' },
};

export default function FlashMessages() {
    const { flash = {}, errors = {} } = usePage().props;
    const validationMessage = errors.enchere;
    const entries = Object.entries(flash).filter(([, message]) => message);
    if (validationMessage) entries.push(['error', validationMessage]);
    const [hidden, setHidden] = useState(false);
    useEffect(() => setHidden(false), [JSON.stringify(entries)]);
    if (!entries.length || hidden) return null;
    return <div className="fixed right-4 top-20 z-50 w-[calc(100%-2rem)] max-w-md space-y-2">{entries.map(([type, message], index) => { const Icon = config[type].icon; return <div key={`${type}-${index}`} className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg ${config[type].style}`}><Icon className="mt-0.5 h-5 w-5 shrink-0" /><p className="flex-1 text-sm font-medium">{message}</p><button onClick={() => setHidden(true)}><X className="h-4 w-4" /></button></div>; })}</div>;
}
