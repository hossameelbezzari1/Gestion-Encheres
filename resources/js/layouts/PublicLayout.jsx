import { Link, router, usePage } from '@inertiajs/react';
import { Gavel, LayoutDashboard, LogOut } from 'lucide-react';
import FlashMessages from '@/components/FlashMessages';

export default function PublicLayout({ children }) {
    const user = usePage().props.auth?.user;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-3 font-bold text-slate-950 dark:text-white">
                        <span className="rounded-lg bg-amber-400 p-2 text-slate-950"><Gavel className="h-5 w-5" /></span>
                        Gestion Enchères
                    </Link>
                    <nav className="flex items-center gap-2">
                        <Link href="/" className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 sm:block">Produits</Link>
                        {user ? (
                            <>
                                <Link href={route('dashboard')} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-amber-400 dark:text-slate-950">
                                    <LayoutDashboard className="h-4 w-4" />Dashboard
                                </Link>
                                <button onClick={() => router.post(route('logout'))} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Connexion</Link>
                                <Link href={route('register')} className="rounded-lg bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-950">Inscription</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <main>{children}</main>
            <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400">
                © {new Date().getFullYear()} Gestion Enchères. Vendez, enchérissez, remportez.
            </footer>
            <FlashMessages />
        </div>
    );
}
