import { Link } from '@inertiajs/react';

export default function Pagination({ links = [] }) {
    if (links.length <= 3) return null;
    return (
        <nav className="mt-5 flex flex-wrap justify-center gap-1">
            {links.map((link, index) => link.url ? (
                <Link key={index} href={link.url} preserveScroll className={`rounded-lg border px-3 py-2 text-sm ${link.active ? 'border-amber-500 bg-amber-500 font-semibold text-slate-950' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
            ) : <span key={index} className="rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-300" dangerouslySetInnerHTML={{ __html: link.label }} />)}
        </nav>
    );
}
