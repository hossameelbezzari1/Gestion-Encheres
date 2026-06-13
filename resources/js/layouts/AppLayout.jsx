import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import FlashMessages from '@/components/FlashMessages';
import Header from '@/components/layout/Header';
import MobileSidebar from '@/components/layout/MobileSidebar';
import Sidebar from '@/components/layout/Sidebar';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    return <div className="min-h-screen bg-slate-50 text-slate-900"><div className="flex"><Sidebar /><MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} /><div className="min-w-0 flex-1"><Header user={auth.user} onMenu={() => setMobileOpen(true)} /><main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main></div></div><FlashMessages /></div>;
}
