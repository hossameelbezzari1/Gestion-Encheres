import { Link } from '@inertiajs/react';
import { Gavel, ShieldCheck, Sparkles, TimerReset } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-svh bg-slate-50 transition-colors dark:bg-slate-950 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
            <aside className="relative hidden min-h-svh overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col xl:p-14">
                <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

                <Link href={route('home')} className="relative z-10 flex items-center gap-3 text-lg font-bold">
                    <span className="rounded-xl bg-amber-400 p-2.5 text-slate-950 shadow-lg shadow-amber-500/10">
                        <Gavel className="h-6 w-6" />
                    </span>
                    Gestion Enchères
                </Link>

                <div className="relative z-10 my-auto max-w-xl py-16">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-sm font-semibold text-amber-300">
                        <Sparkles className="h-4 w-4" />
                        La plateforme des bonnes affaires
                    </span>
                    <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
                        Vendez, enchérissez et remportez.
                    </h2>
                    <p className="mt-5 max-w-lg text-lg leading-8 text-slate-300">
                        Rejoignez une expérience d’enchères simple, transparente et sécurisée.
                    </p>

                    <div className="mt-10 grid gap-5">
                        <div className="flex items-start gap-4">
                            <span className="rounded-lg bg-white/10 p-2 text-amber-300"><ShieldCheck className="h-5 w-5" /></span>
                            <div>
                                <p className="font-semibold">Enchères sécurisées</p>
                                <p className="mt-1 text-sm text-slate-400">Chaque montant est recalculé et validé côté serveur.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="rounded-lg bg-white/10 p-2 text-amber-300"><TimerReset className="h-5 w-5" /></span>
                            <div>
                                <p className="font-semibold">Suivi en temps réel</p>
                                <p className="mt-1 text-sm text-slate-400">Gardez un œil sur les offres et le temps restant.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="relative z-10 text-sm text-slate-500">
                    © {new Date().getFullYear()} Gestion Enchères
                </p>
            </aside>

            <main className="flex min-h-svh flex-col dark:text-slate-100">
                <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:hidden">
                    <Link href={route('home')} className="flex items-center gap-2.5 font-bold text-slate-950 dark:text-white">
                        <span className="rounded-lg bg-amber-400 p-2"><Gavel className="h-5 w-5" /></span>
                        Gestion Enchères
                    </Link>
                    <Link href={route('home')} className="text-sm font-semibold text-slate-500 transition hover:text-amber-700">
                        Accueil
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-12">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{title}</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
