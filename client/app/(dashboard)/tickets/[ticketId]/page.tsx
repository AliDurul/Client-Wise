import TicketLatestActivity from '@/components/dashboard/ticket/TicketLatestActivity';
import TicketReview from '@/components/dashboard/ticket/TicketReview';
import { getAllData, getData } from '@/lib/features/shared/actionUtils';
import { Ticket } from '@/types';
import Link from 'next/link';
import React from 'react'


export async function generateStaticParams() {
    const tickets = await getAllData({ url: 'tickets', customQuery: { limit: 1000, select: '_id' } });
    return tickets.result.map((ticket: Ticket) => ({
        ticketId: ticket._id
    }));
};

export default async function page({ params }: { params: Promise<{ ticketId: string }> }) {

    const { ticketId } = await params;

    const ticket: { success: boolean, result: Ticket } = await getData(`tickets/${ticketId}`);

    return (
        <>
            <div className="mt-5 grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <TicketReview ticket={ticket?.result} />
                <TicketLatestActivity ticket={ticket?.result} />
                 {/* Row 2 */}
                {/* <div className='panel h-52 col-span-1 md:col-span-1 lg:col-span-1'>3</div> */}
                {/* <div className='panel h-32 col-span-1 md:col-span-2 lg:col-span-3'>4</div> */}
         
            </div>
        </>

    )
}
