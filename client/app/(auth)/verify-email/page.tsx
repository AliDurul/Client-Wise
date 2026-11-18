import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify email',
  description: 'Verify your Client White email address.',
  robots: { index: false, follow: false },
}

export default function page() {
  return (
    <div>verify email page</div>
  )
}
