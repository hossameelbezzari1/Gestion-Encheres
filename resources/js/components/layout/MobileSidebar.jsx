import { Gavel, X } from 'lucide-react';
import { useEffect } from 'react';
import { navigation } from './navigation';
import SidebarItem from './SidebarItem';

export default function MobileSidebar({ open, onClose }) {
    useEffect(() => {
        const close = (event) => event.key === 'Escape' && onClose();
        document.addEventListener('keydown', close);
        return () => document.removeEventListener('keydown', close);
    }, [onClose]);
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <button aria-label="Fermer le menu" className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
            <aside className="relative h-full w-72 bg-slate-950 p-4 shadow-2xl">
                <div className="mb-8 flex h-12 items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-amber-400 p-2 text-slate-950">
                            <Gavel className="h-5 w-5" />
                        </span>
                        <span className="font-bold">Gestion Enchères</span>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-800">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <nav className="space-y-1">
                    {navigation.map((item) => (
                        <SidebarItem key={item.href} item={item} onNavigate={onClose} />
                    ))}
                </nav>
            </aside>
        </div>
    );
}
