import React from 'react'
import LeadsDashboard from '@/components/dashboard/lead/LeadsDashboard'

const mockLeads = [
  { _id: '1', company_name: 'Acme Corp', person_name: 'John Doe', email: 'john@acme.com', deal_value: 12000, probability: 80, status: 'Closed-Won', pipeline_stage: 'Closed-Won' },
  { _id: '2', company_name: 'Beta Ltd', person_name: 'Jane Smith', email: 'jane@beta.com', deal_value: 5000, probability: 45, status: 'In Progress', pipeline_stage: 'Negotiation' },
  { _id: '3', company_name: 'Gamma LLC', person_name: 'Will Taylor', email: 'will@gamma.com', deal_value: 3000, probability: 20, status: 'Open', pipeline_stage: 'Proposal|Quotation' },
]

export default function page() {
  return (
    <div className="p-4">
      <LeadsDashboard leads={mockLeads as any} />
    </div>
  )
}
