import TicketStat from '@/components/dashboard/ticket/TicketStat';
import TicketTable from '@/components/dashboard/ticket/TicketTable';
import { getAllData } from '@/lib/features/shared/actionUtils';
import { PageSearchParams } from '@/types'
import React from 'react'

export default async function page({ searchParams }: PageSearchParams) {

  const params = await searchParams;
  const query = params.q || '';
  const page = params.p || '1';
  const limit = params.pl || '20';
  const sortBy = params.sb || 'createdAt';
  const sort = params.s || 'desc';

  const [tickets, ticketStats] = await Promise.all([
    getAllData({
      url: 'tickets/',
      searchQueries: { 'title': query },
      customQuery: { page, limit },
      sortQueries: { [sortBy]: sort }
    }),
    getAllData({
      url: 'tickets/stats',
    })
  ]);

  return (
    <>
      <TicketStat stats={ticketStats?.result} />
      <TicketTable tickets={tickets} />
    </>
  )
}
