import { Link, usePage } from '@inertiajs/react';

export default function SidebarItem({ item, onNavigate }) {
    const { url } = usePage();
    const active = item.href === '/' ? url === '/' : url.startsWith(item.href);
    const Icon = item.icon;
    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
        >
            <Icon className="h-5 w-5" />
            {item.label}
        </Link>
    );
}
