import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Créer votre compte" description="Rejoignez la plateforme et commencez à vendre ou à enchérir.">
            <Head title="Inscription" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="font-medium text-slate-700">
                            Nom complet
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Votre nom complet"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-medium text-slate-700">
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="vous@exemple.com"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="font-medium text-slate-700">
                            Mot de passe
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Choisissez un mot de passe"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="font-medium text-slate-700">
                            Confirmer le mot de passe
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmez le mot de passe"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-11 w-full bg-amber-400 font-semibold text-slate-950 hover:bg-amber-300"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créer mon compte
                    </Button>
                </div>

                <div className="text-center text-sm text-slate-500">
                    Vous avez déjà un compte ?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Se connecter
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
