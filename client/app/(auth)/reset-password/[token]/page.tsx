import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BrandLogo from '@/components/shared/BrandLogo';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Reset password — Client White',
    description: 'Set a new password for your Client White account.',
    robots: { index: false, follow: false },
};

type Props = {
    params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({ params }: Props) {
    const { token } = await params;

    // Guard: tokens are hex strings (40 chars) produced by crypto.randomBytes(20)
    if (!token || !/^[a-f0-9]{40}$/i.test(token)) {
        notFound();
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#060818]">
            {/* ── Left panel ─────────────────────────────────────────────────── */}
            <section
                aria-label="Product overview"
                className="relative hidden w-[55%] flex-col justify-between overflow-hidden bg-[#f1f4fb] p-12 text-slate-900 dark:bg-[#0b1026] dark:text-white lg:flex xl:p-16"
            >
                {/* Dot-grid background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#c7cfe6_1px,transparent_0)] [background-size:22px_22px] dark:opacity-20"
                />

                <BrandLogo className="relative" />

                <div className="relative">
                    <h1 className="max-w-[22ch] text-4xl font-extrabold leading-[1.08] tracking-tight xl:text-5xl">
                        Choose a strong new password.
                    </h1>
                    <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
                        Pick something you haven't used before. A mix of letters, numbers, and symbols
                        keeps your account safe.
                    </p>

                    {/* Security tips */}
                    <div
                        className="relative mt-12 rounded-2xl bg-white p-6 shadow-[0_18px_40px_-18px_rgba(30,41,90,0.35)] dark:bg-[#131a38] max-w-[380px]"
                        aria-hidden="true"
                    >
                        <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Password tips
                        </p>
                        <ul className="space-y-2.5">
                            {[
                                '8 to 16 characters',
                                'At least one uppercase letter',
                                'At least one lowercase letter',
                                'At least one number',
                                'Never reuse a previous password',
                            ].map((tip) => (
                                <li key={tip} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                                    <svg
                                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="relative text-sm text-slate-500 dark:text-slate-400">
                    Customers · Leads · Tickets · Invoices · Email · Team chat
                </p>
            </section>

            {/* ── Right panel ────────────────────────────────────────────────── */}
            <main className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[45%]">
                {/* Mobile logo */}
                <div className="absolute left-6 top-6 text-slate-900 dark:text-white lg:hidden">
                    <BrandLogo size={28} />
                </div>

                <div className="w-full max-w-[420px]">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <svg
                            className="h-6 w-6 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Set new password
                    </h2>
                    <p className="mb-8 mt-2 text-base text-slate-600 dark:text-slate-400">
                        Enter and confirm your new password below.
                    </p>

                    <ResetPasswordForm token={token} />
                </div>

                <p className="absolute bottom-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()}{' '}
                    <Link href="https://alidurul.dev" className="text-primary hover:underline">
                        Ali Durul
                    </Link>
                </p>
            </main>
        </div>
    );
}
