import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset your Client White password.',
  robots: { index: false, follow: false },
}

export default function page() {
  return (
    <div>reset password page</div>
  )
}
