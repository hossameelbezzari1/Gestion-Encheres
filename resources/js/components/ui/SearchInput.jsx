import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SearchInput({ value = '', routeName, params = {}, placeholder = 'Rechercher…' }) {
    const [search, setSearch] = useState(value || '');

    useEffect(() => {
        setSearch(value || '');
    }, [value]);

    const submit = (event) => {
        event.preventDefault();
        router.get(
            route(routeName),
            { ...params, search: search.trim() || undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const clear = () => {
        setSearch('');
        router.get(
            route(routeName),
            { ...params, search: undefined },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <form onSubmit={submit} className="flex gap-2">
            <label className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={placeholder}
                    className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-10 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />
                {search && (
                    <button
                        type="button"
                        onClick={clear}
                        aria-label="Effacer la recherche"
                        className="absolute right-2 top-2 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </label>
            <button
                type="submit"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Rechercher</span>
            </button>
        </form>
    );
}
