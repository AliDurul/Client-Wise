'use client';
import React from 'react';
import { Ticket } from '@/types';
import { formatDate } from '@/lib/utility/functions';

export default function TicketMetaPanel({ ticket }: { ticket: Ticket }) {
  const created = ticket.createdAt ? formatDate(ticket.createdAt, true) : '—';
  const updated = ticket.updatedAt ? formatDate(ticket.updatedAt, true) : '—';
  const ageDays = ticket.createdAt ? Math.max(0, Math.floor((Date.now() - new Date(ticket.createdAt).getTime()) / (1000 * 60 * 60 * 24))) : null;
  const commentCount = ticket.comments?.length || 0;
  const isEscalated = ticket.status === 'escalated';

  return (
    <div className="panel  col-span-1 md:col-span-1 lg:col-span-1 flex flex-col justify-between">
      <div>
        <h5 className="text-sm font-semibold mb-3">Ticket Meta</h5>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <MetaItem label="Category" value={ticket.category?.name || '—'} />
          <MetaItem label="Source" value={ticket.source} />
          <MetaItem label="Priority" value={ticket.priority} />
          <MetaItem label="Status" value={ticket.status} />
          <MetaItem label="Comments" value={String(commentCount)} />
          <MetaItem label="Age (days)" value={ageDays !== null ? String(ageDays) : '—'} />
        </div>
      </div>
      <div className="mt-2 border-t pt-2 text-[11px] flex flex-col gap-1">
        <div className="flex justify-between"><span className="text-white-dark">Created:</span><span>{created}</span></div>
        <div className="flex justify-between"><span className="text-white-dark">Updated:</span><span>{updated}</span></div>
        {isEscalated && (
          <div className="flex justify-between"><span className="text-danger font-semibold">Escalated</span><span className="truncate max-w-[140px]" title={ticket.escalation?.reason}>{ticket.escalation?.reason || '—'}</span></div>
        )}
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded bg-gray-50 dark:bg-[#1b2e4b] p-1 px-2">
      <span className="text-[10px] uppercase tracking-wide text-white-dark">{label}</span>
      <span className="text-xs font-semibold truncate" title={value}>{value}</span>
    </div>
  );
}
