import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react";
import DefaultLayout from '@/components/layout/DefaultLayout';
import SwrProvider from './SwrProvider';


export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface Props {
  readonly children: ReactNode;
}

export default async function layout({ children }: Props) {
  return (
    <SessionProvider >
      <DefaultLayout>
        {/* <SwrProvider> */}
          {children}
        {/* </SwrProvider> */}
      </DefaultLayout>
    </SessionProvider>
  )
}
