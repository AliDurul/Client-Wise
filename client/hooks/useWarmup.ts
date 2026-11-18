'use client';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const SLOW_AFTER_MS = 2000;
const TOAST_ID = 'warmup';

export const WAKING_MESSAGE =
    'Waking up the server and database. The first visit can take up to 30 seconds. Thanks for your patience!';

/**
 * Pings the backend as soon as the page mounts. If the ping (or a pending login)
 * takes longer than 2 seconds, a friendly "waking up" toast is shown until it finishes.
 */
export function useWarmup(isBusy = false) {
    const [warming, setWarming] = useState(true);
    const [slow, setSlow] = useState(false);
    const startedAt = useRef(Date.now());

    useEffect(() => {
        const controller = new AbortController();
        startedAt.current = Date.now();

        fetch('/api/health', { cache: 'no-store', signal: controller.signal })
            .catch(() => undefined)
            .finally(() => {
                if (!controller.signal.aborted) setWarming(false);
            });

        return () => controller.abort();
    }, []);

    const waiting = warming || isBusy;

    useEffect(() => {
        if (!waiting) {
            setSlow(false);
            return;
        }
        const timer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);
        return () => clearTimeout(timer);
    }, [waiting]);

    useEffect(() => {
        if (waiting && slow) {
            toast.loading(WAKING_MESSAGE, { id: TOAST_ID, duration: Infinity, icon: '☕' });
        } else {
            toast.dismiss(TOAST_ID);
        }
        return () => {
            toast.dismiss(TOAST_ID);
        };
    }, [waiting, slow]);

    return { waiting, slow };
}
