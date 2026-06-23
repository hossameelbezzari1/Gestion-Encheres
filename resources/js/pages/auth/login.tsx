import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Bon retour parmi nous" description="Connectez-vous pour gérer vos ventes et suivre vos enchères.">
            <Head title="Connexion" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-medium text-slate-700">
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="vous@exemple.com"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="font-medium text-slate-700">
                                Mot de passe
                            </Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Mot de passe oublié ?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Votre mot de passe"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" tabIndex={3} />
                        <Label htmlFor="remember" className="text-slate-600">
                            Se souvenir de moi
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-11 w-full bg-amber-400 font-semibold text-slate-950 hover:bg-amber-300"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Se connecter
                    </Button>
                </div>

                <div className="text-center text-sm text-slate-500">
                    Vous n’avez pas encore de compte ?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Créer un compte
                    </TextLink>
                </div>
            </form>

            {status && (
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
