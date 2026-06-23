import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

export default function UserMenu({ user }) {
    const [open, setOpen] = useState(false);
    const initials = user.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-amber-400 dark:text-slate-950">
                    {initials}
                </span>
                <span className="hidden text-left sm:block">
                    <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">{user.email}</span>
                </span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <Settings className="h-4 w-4" />
                        Profil
                    </Link>
                    <button
                        onClick={() => router.post(route('logout'))}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </button>
                </div>
            )}
        </div>
    );
}
