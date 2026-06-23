// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="Vérifiez votre e-mail"
            description="Consultez votre boîte de réception et cliquez sur le lien que nous venons de vous envoyer."
        >
            <Head title="Vérification de l’e-mail" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-700">
                    Un nouveau lien de vérification vient d’être envoyé à votre adresse e-mail.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} className="h-11 w-full bg-amber-400 font-semibold text-slate-950 hover:bg-amber-300">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Renvoyer l’e-mail de vérification
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Se déconnecter
                </TextLink>
            </form>
        </AuthLayout>
    );
}
