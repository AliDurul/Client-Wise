'use client';

import { resetPasswordAction } from '@/lib/features/auth/forgotPasswordActions';
import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import InputBox from '../shared/InputBox';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props = {
    token: string;
};

function PasswordStrengthMeter({ password }: { password: string }) {
    const checks = [
        { label: '8–16 characters', pass: password.length >= 8 && password.length <= 16 },
        { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
        { label: 'Lowercase letter', pass: /[a-z]/.test(password) },
        { label: 'Number', pass: /[0-9]/.test(password) },
    ];

    const passCount = checks.filter((c) => c.pass).length;

    const strengthLabel =
        passCount <= 1 ? 'Weak' : passCount === 2 ? 'Fair' : passCount === 3 ? 'Good' : 'Strong';

    const strengthColour =
        passCount <= 1
            ? 'bg-danger'
            : passCount === 2
            ? 'bg-warning'
            : passCount === 3
            ? 'bg-info'
            : 'bg-success';

    if (!password) return null;

    return (
        <div className="mt-2 space-y-2">
            {/* Bar */}
            <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= passCount ? strengthColour : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                    />
                ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
                Strength:{' '}
                <span
                    className={`font-semibold ${
                        passCount <= 1
                            ? 'text-danger'
                            : passCount === 2
                            ? 'text-warning'
                            : passCount === 3
                            ? 'text-info'
                            : 'text-success'
                    }`}
                >
                    {strengthLabel}
                </span>
            </p>
            {/* Checklist */}
            <ul className="space-y-0.5">
                {checks.map((c) => (
                    <li
                        key={c.label}
                        className={`flex items-center gap-1.5 text-xs ${
                            c.pass ? 'text-success' : 'text-slate-400 dark:text-slate-500'
                        }`}
                    >
                        {c.pass ? (
                            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <circle cx="10" cy="10" r="8" className="opacity-30" />
                            </svg>
                        )}
                        {c.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function ResetPasswordForm({ token }: Props) {
    const router = useRouter();
    const boundAction = resetPasswordAction.bind(null, token);
    const [state, action, isPending] = useActionState(boundAction, null);
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!state?.message) return;

        if (state.success) {
            toast.success('Password updated! Redirecting to sign in…');
            const timer = setTimeout(() => router.push('/login'), 2000);
            return () => clearTimeout(timer);
        }

        toast.error(state.message);
    }, [state, router]);

    // ── Success state ──────────────────────────────────────────────────────────
    if (state?.success) {
        return (
            <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <svg
                        className="h-8 w-8 text-success"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Password updated!</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                    Your password has been reset successfully. Redirecting you to sign in…
                </p>
                <div className="mt-4 flex justify-center">
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-l-transparent" />
                </div>
            </div>
        );
    }

    // ── Form state ─────────────────────────────────────────────────────────────
    return (
        <form action={action} className="space-y-5">
            <div>
                <label
                    htmlFor="password"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    New password
                </label>
                <InputBox
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    id="password"
                    disabled={isPending}
                    onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                />
                <PasswordStrengthMeter password={password} />
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                    Confirm password
                </label>
                <InputBox
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter new password"
                    id="confirmPassword"
                    disabled={isPending}
                />
            </div>

            {/* Server-side error */}
            {state?.message && !state.success && (
                <p className="rounded-md bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
                    {state.message}
                </p>
            )}

            <button
                type="submit"
                className="btn btn-primary w-full !py-3 text-base"
                disabled={isPending}
            >
                {isPending && (
                    <span className="mr-3 inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle" />
                )}
                {isPending ? 'Resetting…' : 'Reset password'}
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
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
            </p>
        </form>
    );
}
