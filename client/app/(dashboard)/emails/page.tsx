import React from 'react'
import type { Metadata } from 'next'
import {
    ArrowPathIcon,
    EnvelopeIcon,
    PaperAirplaneIcon,
    TicketIcon,
    TrashIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
    title: 'Email integration',
    description: 'Connect a Gmail inbox to Client White to read, send and turn emails into tickets.',
}

const DEFAULT_VIDEO_URL = 'https://ik.imagekit.io/devlee/email-service.mp4'

const features = [
    { icon: ArrowPathIcon, title: 'Inbox sync', text: 'Read your Gmail inbox inside the CRM, with search, labels and unread counts.' },
    { icon: PaperAirplaneIcon, title: 'Send and reply', text: 'Compose, reply and forward from the company account without leaving the dashboard.' },
    { icon: TicketIcon, title: 'Email to ticket', text: 'Turn any message into a support ticket and assign it to an agent in one click.' },
    { icon: TrashIcon, title: 'Tidy up', text: 'Archive or trash messages from the CRM and keep Gmail in sync.' },
]

const steps = [
    { title: 'Create a Google Cloud project', text: 'In Google Cloud Console, create a project and enable the Gmail API.' },
    { title: 'Set up the OAuth consent screen', text: 'Choose External, add your app name and support email, and add yourself as a test user.' },
    { title: 'Grant the Gmail scopes', text: 'Request compose, send and modify access. Client White never asks for more than it needs.' },
    { title: 'Authorise your account', text: 'Sign in with Google once. The server stores a refresh token and keeps the connection alive.' },
]

const inbox = [
    { from: 'Sarah Kingsley', company: 'Northwind Logistics', subject: 'Dispatch team cannot see new WhatsApp messages', preview: 'Since this morning nothing has arrived in the shared inbox. Could someone take a look?', time: '09:42', unread: true, ticket: false },
    { from: 'Gareth Lloyd', company: 'Marlow & Finch Solicitors', subject: 'Re: Invoice INV-1042', preview: 'Thanks, payment went out today. Please confirm once it lands.', time: '08:15', unread: true, ticket: true },
    { from: 'Anita Rao', company: 'Brightwater Dental Group', subject: 'Training workshop dates', preview: 'Thursday the 12th works for all five practices. Can you send the calendar invite?', time: 'Yesterday', unread: false, ticket: true },
    { from: 'Owen Pritchard', company: 'Kestrel Engineering', subject: 'Question about roles and permissions', preview: 'We want engineers to see tickets but not invoices. Is that possible?', time: 'Yesterday', unread: false, ticket: false },
]

export default function EmailsPage() {
    const videoUrl = process.env.NEXT_PUBLIC_EMAIL_INTEGRATION_VIDEO_URL || DEFAULT_VIDEO_URL

    return (
        <div className="mt-5 space-y-6">
            {/* Intro */}
            <div className="panel">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-2xl">
                        <h1 className="text-2xl font-extrabold tracking-tight">Email integration</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Connect a Gmail inbox so your team can read, send and act on customer emails from one place.
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-warning-light px-3 py-1.5 text-sm font-semibold text-warning dark:bg-warning-dark-light">
                        <LockClosedIcon className="size-4" />
                        Demo mode: live connection is turned off
                    </span>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <video
                            className="aspect-video w-full rounded-xl bg-black/5 object-cover dark:bg-white/5"
                            controls
                            preload="metadata"
                            aria-label="Walkthrough of the Client White email service"
                        >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            A short walkthrough of the setup and the email workflow. Credentials and OAuth screens are not shown in this demo.
                        </p>
                    </div>

                    <ul className="space-y-4 lg:col-span-2">
                        {features.map(({ icon: Icon, title, text }) => (
                            <li key={title} className="flex gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary-dark-light">
                                    <Icon className="size-5" />
                                </span>
                                <div>
                                    <p className="font-bold">{title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Setup */}
            <div className="panel">
                <h2 className="text-lg font-extrabold">Connect Gmail in four steps</h2>
                <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {steps.map((step, i) => (
                        <li key={step.title} className="rounded-xl border border-white-light p-4 dark:border-[#1b2e4b]">
                            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                            <p className="mt-3 font-bold">{step.title}</p>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>

            {/* Preview */}
            <div className="panel px-0">
                <div className="flex items-center justify-between px-5 pb-4">
                    <h2 className="flex items-center gap-2 text-lg font-extrabold">
                        <EnvelopeIcon className="size-5 text-primary" />
                        Inbox preview
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Sample data</span>
                </div>
                <ul className="divide-y divide-white-light dark:divide-[#1b2e4b]">
                    {inbox.map((m) => (
                        <li key={m.subject} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                            <span className={`size-2 shrink-0 rounded-full ${m.unread ? 'bg-primary' : 'bg-transparent'}`} aria-label={m.unread ? 'Unread' : undefined} />
                            <div className="min-w-0 flex-1">
                                <p className={`truncate ${m.unread ? 'font-bold' : 'font-medium'}`}>
                                    {m.from} <span className="font-normal text-gray-500 dark:text-gray-400">· {m.company}</span>
                                </p>
                                <p className={`truncate text-sm ${m.unread ? 'font-semibold' : ''}`}>{m.subject}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{m.preview}</p>
                            </div>
                            {m.ticket ? (
                                <span className="badge badge-outline-success">Ticket created</span>
                            ) : (
                                <span className="badge badge-outline-primary">Create ticket</span>
                            )}
                            <span className="w-20 text-right text-sm text-gray-500 dark:text-gray-400">{m.time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
