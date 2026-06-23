import { Gavel } from 'lucide-react';
import { navigation } from './navigation';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
    return (
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-slate-950 p-4 lg:block">
            <div className="mb-8 flex h-12 items-center gap-3 px-2 text-white">
                <span className="rounded-lg bg-amber-400 p-2 text-slate-950">
                    <Gavel className="h-5 w-5" />
                </span>
                <span className="font-bold">Gestion Enchères</span>
            </div>
            <SidebarGroup title="Navigation">
                {navigation.map((item) => (
                    <SidebarItem key={item.href} item={item} />
                ))}
            </SidebarGroup>
        </aside>
    );
}
