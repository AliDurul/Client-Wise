import React from 'react'
import LeadForm from '@/components/dashboard/lead/LeadForm'
import TopPageNavigation from '@/components/shared/TopPageNavigation'

export default function page() {
  return (
    <>
      <LeadForm lead={null} isEdit={false} readOnly={false} error={null} />
    </>
  )
}
