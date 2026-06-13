import { Clock3 } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

export default function AuctionCountdown({ endDate }) {
    const countdown = useCountdown(endDate);
    if (countdown.expired) return <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500"><Clock3 className="h-4 w-4" />Terminée</span>;
    return <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700"><Clock3 className="h-4 w-4" />{countdown.days}j {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>;
}
