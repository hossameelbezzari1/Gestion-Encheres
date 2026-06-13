import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
    return <div className="flex flex-col items-center px-6 py-12 text-center"><div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800"><Icon className="h-6 w-6 text-slate-500 dark:text-slate-400" /></div><h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3><p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}
