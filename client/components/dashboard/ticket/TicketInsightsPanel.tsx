'use client';
import React from 'react';
import { Ticket } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/lib/utility/functions';

export default function TicketInsightsPanel({ ticket }: { ticket: Ticket }) {
  const commentCount = ticket.comments?.length || 0;
  const isEscalated = ticket.status === 'escalated';
  const hasEmail = !!ticket.email_id;
  const createdAt = ticket.createdAt ? formatDate(ticket.createdAt, true) : '—';

  return (
    <div className="panel col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-semibold">Insights & Quick Actions</h5>
        {hasEmail && (
          <Link href={`/emails/${ticket.email_id}`} className="text-primary text-xs font-semibold hover:underline">
            View Email
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <Insight label="Created" value={createdAt} />
        <Insight label="Assigned Agent" value={ticket.assigned_agent?.first_name || '—'} />
        <Insight label="Customer" value={ticket.customer?.full_name || '—'} />
        <Insight label="Comments" value={String(commentCount)} />
        <Insight label="Flag" value={ticket.flag} />
        <Insight label="Priority" value={ticket.priority} />
        <Insight label="Status" value={ticket.status} />
        <Insight label="Escalated" value={isEscalated ? 'Yes' : 'No'} highlight={isEscalated} />
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button type="button" className="btn btn-sm btn-outline-primary rounded-md">Edit</button>
        {ticket.status !== 'escalated' && (
          <button type="button" className="btn btn-sm btn-outline-danger rounded-md">Escalate</button>
        )}
      </div>
    </div>
  );
}

function Insight({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col rounded bg-gray-50 dark:bg-[#1b2e4b] p-2 ${highlight ? 'ring-1 ring-danger/50' : ''}`}> 
      <span className="text-[10px] uppercase tracking-wide text-white-dark">{label}</span>
      <span className={`text-xs font-semibold truncate ${highlight ? 'text-danger' : ''}`} title={value}>{value}</span>
    </div>
  );
}
