import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-red-100 px-5 py-4 sm:px-6">
                <span className="rounded-lg bg-red-100 p-2 text-red-700"><Trash2 className="h-5 w-5" /></span>
                <div>
                    <h2 className="font-semibold text-slate-950">Supprimer le compte</h2>
                    <p className="text-sm text-slate-500">Supprimez définitivement votre compte et toutes ses données.</p>
                </div>
            </div>

            <div className="p-5 sm:p-6">
                <div className="mb-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                        <p className="font-semibold">Cette action est irréversible</p>
                        <p className="mt-1 text-sm leading-5 text-red-700">Tous vos produits, enchères et informations seront définitivement supprimés.</p>
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="font-semibold">Supprimer mon compte</Button>
                    </DialogTrigger>
                    <DialogContent className="border-slate-200 sm:max-w-lg">
                        <DialogTitle className="text-xl text-slate-950">Confirmer la suppression du compte</DialogTitle>
                        <DialogDescription>
                            Votre compte et toutes ses données seront supprimés définitivement. Saisissez votre mot de passe pour confirmer.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-medium text-slate-700">
                                    Mot de passe
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Votre mot de passe"
                                    autoComplete="current-password"
                                    className="h-11 border-slate-300 focus-visible:border-red-500 focus-visible:ring-red-200"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Annuler
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={processing} asChild>
                                    <button type="submit">Supprimer définitivement</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
