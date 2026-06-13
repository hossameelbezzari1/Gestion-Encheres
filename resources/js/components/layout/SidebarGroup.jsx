export default function SidebarGroup({ title, children }) {
    return <div><p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p><div className="space-y-1">{children}</div></div>;
}
