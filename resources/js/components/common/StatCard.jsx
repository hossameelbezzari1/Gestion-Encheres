import Card from '@/components/ui/AppCard';

export default function StatCard({ label, value, icon: Icon, accent = 'amber' }) {
    const colors = {
        amber: 'bg-amber-100 text-amber-700',
        slate: 'bg-slate-100 text-slate-700',
        emerald: 'bg-emerald-100 text-emerald-700',
        sky: 'bg-sky-100 text-sky-700',
    };
    return (
        <Card className="p-0">
            <div className="flex items-center gap-4">
                <div className={`rounded-xl p-3 ${colors[accent]}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
                </div>
            </div>
        </Card>
    );
}
