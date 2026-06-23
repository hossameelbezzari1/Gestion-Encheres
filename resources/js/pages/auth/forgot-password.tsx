// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Mot de passe oublié ?" description="Indiquez votre adresse e-mail pour recevoir un lien de réinitialisation.">
            <Head title="Mot de passe oublié" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-medium text-slate-700">
                            Adresse e-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="vous@exemple.com"
                            className="h-11 border-slate-300 focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="h-11 w-full bg-amber-400 font-semibold text-slate-950 hover:bg-amber-300" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Envoyer le lien de réinitialisation
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-slate-500">
                    <span>Revenir à la</span>
                    <TextLink href={route('login')}>connexion</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
