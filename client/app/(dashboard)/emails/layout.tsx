'use client';
import EmailDefaultLayout from '@/components/dashboard/email/EmailDefaultLayout.tsx'
import TopPageNavigation from '@/components/shared/TopPageNavigation';
import React, { ReactNode } from 'react'

export default function EmailLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <TopPageNavigation />
            <EmailDefaultLayout>
                {children}
            </EmailDefaultLayout>
        </div>
    )
}
