'use client';

import { forgotPasswordAction } from '@/lib/features/auth/forgotPasswordActions';
import React, { useActionState, useEffect } from 'react';
import Link from 'next/link';
import InputBox from '../shared/InputBox';
import toast from 'react-hot-toast';

export default function ForgotPasswordForm() {
    const [state, action, isPending] = useActionState(forgotPasswordAction, null);

    useEffect(() => {
        if (!state?.message) return;
        if (!state.success) {
            toast.error(state.message);
        }
    }, [state]);

    // ── Success state ──────────────────────────────────────────────────────────
    if (state?.success) {
        return (
            <div className="text-center">
                {/* Check-circle illustration */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <svg
                        className="h-8 w-8 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Check your inbox</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    We've sent a password-reset link to your email address. The link expires in{' '}
                    <strong>1 hour</strong>.
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Didn't receive it? Check your spam folder or{' '}
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="font-semibold text-primary hover:underline"
                    >
                        try again
                    </button>
                    .
                </p>

                <Link
                    href="/login"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-primary"
                >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to sign in
                </Link>
            </div>
        );
    }

    // ── Form state ─────────────────────────────────────────────────────────────
    return (
        <form action={action} className="space-y-5">
            <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email address
                </label>
                <InputBox
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    id="email"
                    value={(state?.inputs?.email as string) ?? ''}
                    disabled={isPending}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary w-full !py-3 text-base"
                disabled={isPending}
            >
                {isPending && (
                    <span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle" />
                )}
                {isPending ? 'Sending…' : 'Send reset link'}
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Remembered it?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </form>
    );
}
