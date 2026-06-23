import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import AppLayout from '@/layouts/AppLayout';
import SettingsLayout from '@/layouts/settings/layout';
import { Palette } from 'lucide-react';

export default function Appearance() {
    return (
        <AppLayout>
            <Head title="Apparence" />

            <SettingsLayout>
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                        <span className="rounded-lg bg-amber-100 p-2 text-amber-700">
                            <Palette className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="font-semibold text-slate-950">Apparence de l’interface</h2>
                            <p className="text-sm text-slate-500">Choisissez le thème qui vous convient le mieux.</p>
                        </div>
                    </div>
                    <div className="p-5 sm:p-6">
                        <AppearanceTabs className="w-full sm:w-auto" />
                        <p className="mt-4 text-sm leading-6 text-slate-500">
                            Le thème système suit automatiquement les préférences de votre appareil.
                        </p>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
