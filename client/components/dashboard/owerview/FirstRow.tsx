"use client";
import Dropdown from '@/components/layout/Dropdown'
import { DashCardStats } from '@/types';
import React from 'react'

export default function FirstRow({ cardStats }: { cardStats: DashCardStats }) {
    const { customers, invoices, tickets, leads } = cardStats;
    return (
        <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
            <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                <div className="flex justify-between">
                    <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total Clients</div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement='bottom-end'
                            btnClassName="hover:text-primary"
                            button={
                                <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        >
                            <ul className="text-black dark:text-white-dark">
                                <li>
                                    <button type="button">View Report</button>
                                </li>
                                <li>
                                    <button type="button">Edit Report</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-around">
                    <div className="text-5xl px-2 text-center font-bold "> {customers.total} </div>
                    <div className='flex flex-col'>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {customers.byType.corporate} Corporate
                            </div>
                        </div>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {customers.byType.individual} Individual
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ticket */}
            <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                <div className="flex justify-between">
                    <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total Tickets</div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement='bottom-end'
                            btnClassName="hover:text-primary"
                            button={
                                <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        >
                            <ul className="text-black dark:text-white-dark">
                                <li>
                                    <button type="button">View Report</button>
                                </li>
                                <li>
                                    <button type="button">Edit Report</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-around">
                    <div className="text-5xl px-2 text-center font-bold "> {tickets.total} </div>
                    <div className='flex flex-col'>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {tickets.status.active} Acvtive
                            </div>
                        </div>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {tickets.status.resolved} Resolved
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*  Leads */}
            <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                <div className="flex justify-between">
                    <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total Leads</div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement='bottom-end'
                            btnClassName="hover:text-primary"
                            button={
                                <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        >
                            <ul className="text-black dark:text-white-dark">
                                <li>
                                    <button type="button">View Report</button>
                                </li>
                                <li>
                                    <button type="button">Edit Report</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-around">
                    <div className="text-5xl px-2 text-center font-bold "> {leads.total} </div>
                    <div className='flex flex-col'>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {leads.pipeline_stage['Closed-Won']} Closed-Won
                            </div>
                        </div>
                        <div className="badge px-3 bg-white/30">
                            <div className="flex items-center text-base font-semibold">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                                    <path
                                        opacity="0.5"
                                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                                {leads.pipeline_stage['Negotiation']} Negotiation
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Invoice */}
            <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                <div className="flex justify-between">
                    <div className="text-lg font-semibold ltr:mr-1 rtl:ml-1">Total Profit</div>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 5]}
                            placement='bottom-end'
                            btnClassName="hover:text-primary"
                            button={
                                <svg className="h-5 w-5 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            }
                        >
                            <ul className="text-black dark:text-white-dark">
                                <li>
                                    <button type="button">View Report</button>
                                </li>
                                <li>
                                    <button type="button">Edit Report</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <div className="mt-5 flex items-center">
                    <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> $ {invoices.totalProfit} </div>
                    <div className="badge bg-white/30">{invoices.comparisonPct}% </div>
                </div>
                <div className="mt-5 flex items-center font-semibold">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-2 rtl:ml-2">
                        <path
                            opacity="0.5"
                            d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Last Week $ {invoices.lastPeriodProfit}
                </div>
            </div>
        </div>
    )
}
