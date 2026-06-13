import InputError from '@/components/input-error';
import AppLayout from '@/layouts/AppLayout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, KeyRound } from 'lucide-react';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Mot de passe" />

            <SettingsLayout>
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                        <span className="rounded-lg bg-amber-100 p-2 text-amber-700"><KeyRound className="h-5 w-5" /></span>
                        <div>
                            <h2 className="font-semibold text-slate-950">Modifier le mot de passe</h2>
                            <p className="text-sm text-slate-500">Utilisez un mot de passe long et unique pour protéger votre compte.</p>
                        </div>
                    </div>

                    <form onSubmit={updatePassword} className="space-y-5 p-5 sm:p-6">
                        <div className="grid gap-2">
                            <Label htmlFor="current_password" className="font-medium text-slate-700">Mot de passe actuel</Label>

                            <Input
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                                autoComplete="current-password"
                                placeholder="Votre mot de passe actuel"
                            />

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="font-medium text-slate-700">Nouveau mot de passe</Label>

                            <Input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                                autoComplete="new-password"
                                placeholder="Votre nouveau mot de passe"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="font-medium text-slate-700">Confirmer le mot de passe</Label>

                            <Input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                                autoComplete="new-password"
                                placeholder="Confirmez le nouveau mot de passe"
                            />

                            <InputError message={errors.password_confirmation} />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className="h-10 bg-amber-400 px-5 font-semibold text-slate-950 hover:bg-amber-300">
                                Enregistrer le mot de passe
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
            </SettingsLayout>
        </AppLayout>
    );
}
