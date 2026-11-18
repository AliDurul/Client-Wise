import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BrandLogo from '@/components/shared/BrandLogo';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
    title: 'Forgot password — Client White',
    description: 'Request a password-reset link for your Client White account.',
    robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
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
                        Back in a moment.
                    </h1>
                    <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
                        Enter the email address tied to your account and we'll send you a secure link to
                        choose a new password.
                    </p>

                    {/* Steps illustration */}
                    <div className="relative mt-12 space-y-4 max-w-[380px]" aria-hidden="true">
                        {[
                            { step: '01', label: 'Enter your email address below' },
                            { step: '02', label: 'Open the reset link in your inbox' },
                            { step: '03', label: 'Choose a strong new password' },
                        ].map(({ step, label }) => (
                            <div
                                key={step}
                                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0_8px_24px_-8px_rgba(30,41,90,0.2)] dark:bg-[#131a38]"
                            >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                                    {step}
                                </span>
                                <p className="text-sm font-medium">{label}</p>
                            </div>
                        ))}
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
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                    </div>

                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Forgot your password?
                    </h2>
                    <p className="mb-8 mt-2 text-base text-slate-600 dark:text-slate-400">
                        No worries — enter your work email and we'll send a reset link.
                    </p>

                    <ForgotPasswordForm />
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
