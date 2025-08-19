import { getAllData, getData } from '@/lib/features/shared/actionUtils';
import { Escalation, Ticket, TicketComment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

import React from 'react'


interface TicketActivityResponse {
    success: boolean;
    result: result
}


interface result {
    _id: string;
    escalation: Escalation | null;
    comments: TicketComment[]
}

export default async function page({ params }: { params: Promise<{ ticketId: string }> }) {

    const { ticketId } = await params;

    const res: TicketActivityResponse = await getData(`tickets/comments/${ticketId}`);
    const result = res.result

    return (
        <div className='panel mt-4'>
            <div className="mb-5">
                <p className="text-white-dark font-bold mb-5 text-base">All Comments</p>
                {
                    result?.comments?.map((c: TicketComment, i: number, arr: TicketComment[]) => {
                        const isLast = i === arr.length - 1;
                        return (
                            <div className="sm:flex" key={i}>
                                <div className={`relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2] ${!isLast ? 'before:absolute before:top-12 before:left-1/2 before:-bottom-[15px] before:-translate-x-1/2 before:border-l-2 before:border-[#ebedf2] before:w-0 before:h-auto before:-z-[1] before:hidden sm:before:block' : ''} dark:before:border-[#191e3a] `}>
                                    <Image src={c.author.profile_pic ?? ''} width={48} height={48} alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">{c.author.full_name}</h4>
                                    <p className="text-center ltr:sm:text-left rtl:sm:text-right">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}</p>
                                    <div className="mt-4 sm:mt-7 mb-16">
                                        <svg
                                            className="inline-block align-text-bottom text-white-dark ltr:mr-2.5 rtl:ml-2.5"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                opacity="0.5"
                                                d="M2 12H22M16 12C16 13.3132 15.8965 14.6136 15.6955 15.8268C15.4945 17.0401 15.1999 18.1425 14.8284 19.0711C14.457 19.9997 14.016 20.7362 13.5307 21.2388C13.0454 21.7413 12.5253 22 12 22C11.4747 22 10.9546 21.7413 10.4693 21.2388C9.98396 20.7362 9.54301 19.9997 9.17157 19.0711C8.80014 18.1425 8.5055 17.0401 8.30448 15.8268C8.10346 14.6136 8 13.3132 8 12C8 10.6868 8.10346 9.38642 8.30448 8.17316C8.5055 6.95991 8.80014 5.85752 9.17157 4.92893C9.54301 4.00035 9.98396 3.26375 10.4693 2.7612C10.9546 2.25866 11.4747 2 12 2C12.5253 2 13.0454 2.25866 13.5307 2.76121C14.016 3.26375 14.457 4.00035 14.8284 4.92893C15.1999 5.85752 15.4945 6.95991 15.6955 8.17317C15.8965 9.38642 16 10.6868 16 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 10.6868 2.25866 9.38642 2.76121 8.17316C3.26375 6.95991 4.00035 5.85752 4.92893 4.92893C5.85752 4.00035 6.95991 3.26375 8.17317 2.7612C9.38642 2.25866 10.6868 2 12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12L22 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                        <h6 className="inline-block font-bold mb-2 text-base">Comment</h6>
                                        <p className="ltr:pl-8 rtl:pr-8 text-white-dark font-semibold">{c.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    result.escalation && (
                        <>
                            <p className="text-white-dark font-bold mb-5 text-base">Escalation</p>
                            <div className="sm:flex">
                                <div className={`relative mx-auto mb-5 sm:mb-0 ltr:sm:mr-8 rtl:sm:ml-8 z-[2]  dark:before:border-[#191e3a] `}>
                                    <Image src={result?.escalation?.raised_by?.profile_pic ?? ''} width={48} height={48} alt="img" className="w-12 h-12 mx-auto rounded-full shadow-[0_4px_9px_0_rgba(31,45,61,0.31)]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-primary text-xl font-bold text-center ltr:sm:text-left rtl:sm:text-right">{result?.escalation?.raised_by?.full_name} </h4>
                                    {/* <p className="text-center ltr:sm:text-left rtl:sm:text-right">{formatDistanceToNow(new Date(ticket?.escalation?.createdAt ?? ''), { addSuffix: true })}</p> */}
                                    <div className="mt-4 sm:mt-7 mb-2 flex flex-wrap gap-x-10">
                                        {/* <div className="inline-flex font-bold mb-1 text-base">Location: <p className="ltr:pl-6 rtl:pr-8 text-white-dark font-semibold mb-2">{ticket?.escalation?.location}</p></div> */}
                                        {/* <div className="inline-flex font-bold mb-1 text-base">The Land Mark: <p className="ltr:pl-6 rtl:pr-8 text-white-dark font-semibold mb-2">{ticket?.escalation?.landmark}</p></div> */}
                                        {/* <div className="inline-flex font-bold mb-1 text-base">Client Phone Number: <p className="ltr:pl-6 rtl:pr-8 text-white-dark font-semibold mb-2">{ticket?.escalation?.phonenumber}</p></div> */}
                                    </div>
                                    <h6 className="inline-block font-bold mb-1 text-base">The Reason</h6>
                                    <p className="ltr:pl-6 rtl:pr-8 text-white-dark font-semibold mb-2">{result?.escalation?.reason}</p>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
