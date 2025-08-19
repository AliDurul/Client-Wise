'use client';
import { formatDate, truncateText } from '@/lib/utility/functions';
import { Ticket, TicketComment } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';


export default function TicketLatestActivity({ ticket }: { ticket: Ticket }) {

  const comments = ticket?.comments || [];


  return (
    <div className="panel sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2  pb-0 relative " >
      <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white-light">
        <h5 className="text-lg font-semibold ">Lastest Activity</h5>
      </div>
      {/* <PerfectScrollbar className="perfect-scrollbar h-5/6 -mr-3  pr-3">
      </PerfectScrollbar> */}
      <div className="space-y-7 overflow-x-auto">

        {
          ticket.status === 'escalated' && (
            <div className="flex">
              <div className={`relative z-10 ltr:mr-2 rtl:ml-2`}>
                {
                  ticket?.escalation?.raised_by?.profile_pic?.startsWith('https') ? (
                    <Image src={ticket?.escalation?.raised_by?.profile_pic} alt="avatar" width={50} height={50} className="rounded-full object-cover" />
                  ) : (
                    <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-white shadow shadow-secondary" />
                  )
                }
              </div>
              <div>
                <h5 className=" dark:text-white-light">
                  Escalated by <button type="button" className='font-semibold'>{ticket?.escalation?.raised_by.first_name}</button> : {' '}
                  <button type="button" className="text-danger">
                    {`[${truncateText(ticket?.escalation?.reason, 25)}]`}
                  </button>
                </h5>
                <p className="text-xs text-white-dark">{formatDate(ticket?.escalation?.createdAt)}</p>
              </div>
            </div>
          )
        }

        <div className="mx-auto mt-3 h-px border-b border-white-light dark:border-[#1b2e4b] w-3/4" />


        {
          comments.map((comment: TicketComment, i: number, arr: TicketComment[]) => {
            const isLast = i === arr.length - 1;
            return (
              <div className="flex">
                <div className={`relative z-10 ${!isLast ? 'before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30' : ''} ltr:mr-2 rtl:ml-2`}>
                  {
                    comment.author.profile_pic?.startsWith('https') ? (
                      <Image src={comment.author.profile_pic} alt="avatar" width={50} height={50} className="  rounded-full object-cover" />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-full bg-secondary text-white shadow shadow-secondary" />
                    )
                  }
                </div>
                <div key={comment?._id}>
                  <h5 className=" dark:text-white-light">
                    Comment created by <button type="button" className='font-semibold'>{comment.author.first_name}</button> : {' '}
                    <button type="button" className="text-success">
                      {`[${truncateText(comment.comment, 25)}]`}
                    </button>
                  </h5>
                  <p className="text-xs text-white-dark">{formatDate(comment.createdAt, true)}</p>
                </div>
              </div>
            )
          })
        }


      </div>
      <div className="absolute bottom-0 left-0 right-0 hidden md:block">
        <Link href={`/tickets/activities/${ticket._id}`} type="button" className="group flex w-full items-center justify-center p-4 font-semibold hover:text-primary border-t border-white-light dark:border-white/10">
          View All
          <svg
            className="h-4 w-4 transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
