import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout';
import SettingsLayout from '@/layouts/settings/layout';
import { CheckCircle2, Mail, UserRound } from 'lucide-react';

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <AppLayout>
            <Head title="Paramètres du profil" />

            <SettingsLayout>
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                        <span className="rounded-lg bg-amber-100 p-2 text-amber-700"><UserRound className="h-5 w-5" /></span>
                        <div>
                            <h2 className="font-semibold text-slate-950">Informations du profil</h2>
                            <p className="text-sm text-slate-500">Mettez à jour votre nom et votre adresse e-mail.</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-5 p-5 sm:p-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="font-medium text-slate-700">Nom complet</Label>

                            <Input
                                id="name"
                                className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Votre nom complet"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="font-medium text-slate-700">Adresse e-mail</Label>

                            <Input
                                id="email"
                                type="email"
                                className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="vous@exemple.com"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                <div className="flex gap-2">
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                                    <p>
                                        Votre adresse e-mail n’est pas vérifiée.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="font-semibold underline hover:text-amber-700"
                                        >
                                            Renvoyer l’e-mail de vérification.
                                        </Link>
                                    </p>
                                </div>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-3 text-sm font-medium text-emerald-700">
                                        Un nouveau lien a été envoyé à votre adresse e-mail.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className="h-10 bg-amber-400 px-5 font-semibold text-slate-950 hover:bg-amber-300">
                                Enregistrer
                            </Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600"><CheckCircle2 className="h-4 w-4" />Enregistré</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
