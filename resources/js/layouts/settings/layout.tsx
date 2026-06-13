import { Link, usePage } from '@inertiajs/react';
import { KeyRound, Palette, UserRound } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Profil',
        description: 'Informations personnelles',
        url: '/settings/profile',
        icon: UserRound,
    },
    {
        title: 'Mot de passe',
        description: 'Sécurité du compte',
        url: '/settings/password',
        icon: KeyRound,
    },
    {
        title: 'Apparence',
        description: 'Thème de l’interface',
        url: '/settings/appearance',
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Paramètres</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Gérez votre profil, la sécurité et les préférences de votre compte.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                <aside>
                    <nav className="grid gap-2 sm:grid-cols-3 lg:sticky lg:top-22 lg:grid-cols-1">
                        {sidebarNavItems.map((item) => {
                            const Icon = item.icon;
                            const active = url.startsWith(item.url);
                            return (
                                <Link
                                    key={item.url}
                                    href={item.url}
                                    prefetch
                                    className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                                        active
                                            ? 'border-amber-300 bg-amber-50 text-slate-950 shadow-sm dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    <span className={`rounded-lg p-2 ${active ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-500'}`}>
                                        <Icon className="h-5 w-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-sm font-semibold">{item.title}</span>
                                        <span className="hidden text-xs text-slate-500 xl:block">{item.description}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <section className="min-w-0 space-y-6">{children}</section>
            </div>
        </div>
    );
}
