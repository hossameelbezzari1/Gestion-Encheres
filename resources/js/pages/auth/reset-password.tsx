import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

interface ResetPasswordForm {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordForm>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Nouveau mot de passe" description="Choisissez un nouveau mot de passe sécurisé pour votre compte.">
            <Head title="Réinitialiser le mot de passe" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-medium text-slate-700">Adresse e-mail</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className="h-11 w-full border-slate-300 bg-slate-50"
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="font-medium text-slate-700">Nouveau mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Nouveau mot de passe"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="font-medium text-slate-700">Confirmer le mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="h-11 w-full border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmez le mot de passe"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <Button type="submit" className="mt-2 h-11 w-full bg-amber-400 font-semibold text-slate-950 hover:bg-amber-300" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Réinitialiser le mot de passe
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
