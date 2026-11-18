import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import BrandLogo from '@/components/shared/BrandLogo';

export const metadata: Metadata = {
    title: 'Sign in',
    description: 'Sign in to Client White to manage customers, leads, support tickets and invoices in one workspace.',
    alternates: { canonical: '/login' },
    openGraph: { url: '/login', siteName: 'Client White', type: 'website', images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Client White',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'CRM and helpdesk for customers, leads, support tickets, invoices, email and team chat.',
    author: { '@type': 'Person', name: 'Ali Durul', url: 'https://alidurul.dev' },
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen bg-white dark:bg-[#060818]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Left panel: the product itself, not a stock illustration */}
            <section
                aria-label="Product overview"
                className="relative hidden w-[55%] flex-col justify-between overflow-hidden bg-[#f1f4fb] p-12 text-slate-900 dark:bg-[#0b1026] dark:text-white lg:flex xl:p-16"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#c7cfe6_1px,transparent_0)] [background-size:22px_22px] dark:opacity-20"
                />

                <BrandLogo className="relative" />

                <div className="relative">
                    <h1 className="max-w-[16ch] text-4xl font-extrabold leading-[1.08] tracking-tight xl:text-5xl">
                        Every client, every deal, in one clear view.
                    </h1>
                    <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
                        Track leads through your pipeline, answer support tickets, and send invoices without switching tools.
                    </p>

                    {/* Stacked product cards */}
                    <div className="relative mt-12 h-[310px] max-w-[470px]" aria-hidden="true">
                        <div className="absolute left-0 top-0 w-[290px] -rotate-2 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_rgba(30,41,90,0.35)] dark:bg-[#131a38]">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span>Lead</span>
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">Negotiation</span>
                            </div>
                            <p className="mt-2 text-lg font-bold">Northwind Logistics</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Fleet support plan, 24 vehicles</p>
                            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                                <div className="h-full w-3/4 rounded-full bg-[#4361ee]" />
                            </div>
                            <p className="mt-2 text-sm font-semibold">£48,000 <span className="font-normal text-slate-500 dark:text-slate-400">expected</span></p>
                        </div>

                        <div className="absolute right-0 top-10 w-[220px] rotate-2 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_rgba(30,41,90,0.35)] dark:bg-[#131a38]">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span>Invoice INV-1042</span>
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">Paid</span>
                            </div>
                            <p className="mt-2 text-2xl font-extrabold">£3,250</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Harbour &amp; Pine Ltd</p>
                        </div>

                        <div className="absolute bottom-0 left-16 w-[300px] rounded-2xl bg-white p-4 shadow-[0_18px_40px_-18px_rgba(30,41,90,0.35)] dark:bg-[#131a38]">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <span>Ticket #318</span>
                                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">Resolved in 2h</span>
                            </div>
                            <p className="mt-2 text-sm font-semibold">Can&apos;t download my March statement</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Assigned to Priya Shah</p>
                        </div>
                    </div>
                </div>

                <p className="relative text-sm text-slate-500 dark:text-slate-400">
                    Customers · Leads · Tickets · Invoices · Email · Team chat
                </p>
            </section>

            {/* Right panel: sign in */}
            <main className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[45%]">
                <div className="absolute left-6 top-6 text-slate-900 dark:text-white lg:hidden">
                    <BrandLogo size={28} />
                </div>

                <div className="w-full max-w-[420px]">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Sign in to Client White
                    </h2>
                    <p className="mb-8 mt-2 text-base text-slate-600 dark:text-slate-400">
                        Use your work email to open your dashboard.
                    </p>

                    <LoginForm />

                    <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        Locked out?{' '}
                        <Link href="/reset-password" className="font-semibold text-primary hover:underline">
                            Reset your password
                        </Link>
                    </p>
                </div>

                <p className="absolute bottom-5 text-center text-sm text-slate-500 dark:text-slate-400">
                    © {new Date().getFullYear()}{' '}
                    <Link href="https://alidurul.dev" className="text-primary hover:underline">Ali Durul</Link>
                </p>
            </main>
        </div>
    );
}
