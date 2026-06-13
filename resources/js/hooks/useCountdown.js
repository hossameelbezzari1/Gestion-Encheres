import { useEffect, useMemo, useState } from 'react';

export function useCountdown(endDate) {
    const calculate = () => Math.max(0, new Date(endDate).getTime() - Date.now());
    const [remaining, setRemaining] = useState(calculate);

    useEffect(() => {
        const timer = window.setInterval(() => setRemaining(calculate()), 1000);
        return () => window.clearInterval(timer);
    }, [endDate]);

    return useMemo(() => {
        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        return { remaining, days, hours, minutes, seconds, expired: remaining === 0 };
    }, [remaining]);
}
