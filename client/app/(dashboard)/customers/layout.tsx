import TopPageNavigation from '@/components/shared/TopPageNavigation';
import React, { ReactNode } from 'react'

interface Props {
    readonly children: ReactNode;
}

export default function CustomerLayout({ children }: Props) {
    return (
        <>
            <TopPageNavigation />

            {children}
        </>
    )
}
