import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';

export default function Header({ user, onMenu }) {
    return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6"><button onClick={onMenu} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Menu className="h-6 w-6" /></button><div className="hidden lg:block"><p className="text-sm font-semibold text-slate-800">Espace de gestion</p><p className="text-xs text-slate-500">Pilotez vos ventes en toute simplicité</p></div><UserMenu user={user} /></header>;
}
