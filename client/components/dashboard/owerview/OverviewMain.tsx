'use client';
import { use, useEffect, useState } from 'react';
import Dropdown from '../../layout/Dropdown';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {  uniqueVisitorSeries } from '@/constants/dashboard';
import dynamic from 'next/dynamic';
import FirstRow from './FirstRow';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});
const SecondRow = dynamic(() => import('./SecondRow'), {
    ssr: false,
});
const ThirdRow = dynamic(() => import('./ThirdRow'), {
    ssr: false,
});


const activityColors: Record<string, string> = {
    ticket: 'bg-secondary',
    lead: 'bg-success',
    invoice: 'bg-primary',
    task: 'bg-warning',
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const OverviewMain = ({ overviewPromise }: any) => {

    const overview: any = use(overviewPromise);

    const cardStats = overview?.result?.cardStats;
    const monthlyStats = overview?.result?.monthlyStats;
    const recentInvoices = overview?.result?.recentInvoices;

    const recentActivity: any[] = overview?.result?.recentActivity || [];

    const monthLabels: string[] | undefined = monthlyStats?.labels;
    const activityChart = {
        series: [
            { name: 'Tickets', data: monthlyStats?.countTickets?.[0]?.data ?? [] },
            { name: 'Leads', data: monthlyStats?.countLeads?.[0]?.data ?? [] },
        ],
        options: {
            ...uniqueVisitorSeries.options,
            xaxis: { ...uniqueVisitorSeries.options.xaxis, categories: monthLabels ?? uniqueVisitorSeries.options.xaxis.categories },
        },
    };
    const secondRowData = { monthlyStats, recentInvoices }

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    });

    return (

        <div className="pt-5">

            <FirstRow cardStats={cardStats} />

            <SecondRow secondRowData={secondRowData} />

            <ThirdRow thirdRowData={monthlyStats} />


            <div className="mb-6 grid gap-6 lg:grid-cols-3">
                <div className="panel h-full">
                    <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white-light">
                        <h5 className="text-lg font-semibold ">Activity Log</h5>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement='bottom-end'
                                btnClassName="hover:text-primary"
                                button={
                                    <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                }
                            >
                                <ul>
                                    <li>
                                        <button type="button">View All</button>
                                    </li>
                                    <li>
                                        <button type="button">Mark as Read</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <PerfectScrollbar className="perfect-scrollbar relative -mr-3 h-[360px] pr-3">
                        {recentActivity.length === 0 ? (
                            <p className="text-sm text-white-dark">No recent activity yet. New tickets, leads, invoices and tasks will show up here.</p>
                        ) : (
                            <div className="space-y-7">
                                {recentActivity.map((event: any, i: number) => (
                                    <div className="flex" key={`${event.type}-${i}`}>
                                        <div className={`relative z-10 ltr:mr-2 rtl:ml-2 ${i < recentActivity.length - 1 ? 'before:absolute before:top-10 before:left-4 before:h-[calc(100%-24px)] before:w-[2px] before:bg-white-dark/30' : ''}`}>
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${activityColors[event.type] || 'bg-primary'}`}>
                                                {String(event.type).charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <h5 className="font-semibold dark:text-white-light">{event.text}</h5>
                                            <p className="truncate text-sm text-white-dark">{event.detail}</p>
                                            <p className="text-xs text-white-dark">{formatDate(event.date)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </PerfectScrollbar>
                </div>

                <div className="panel h-full p-0 lg:col-span-2">
                    <div className="mb-5 flex items-start justify-between border-b border-white-light p-5  dark:border-[#1b2e4b] dark:text-white-light">
                        <h5 className="text-lg font-semibold ">Tickets and leads by month</h5>
                        <div className="dropdown">
                            <Dropdown
                                offset={[0, 5]}
                                placement='bottom-end'
                                btnClassName="hover:text-primary"
                                button={
                                    <svg className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                }
                            >
                                <ul>
                                    <li>
                                        <button type="button">View</button>
                                    </li>
                                    <li>
                                        <button type="button">Update</button>
                                    </li>
                                    <li>
                                        <button type="button">Delete</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>

                    {isMounted && <ReactApexChart options={activityChart.options} series={activityChart.series} type="bar" height={360} width={'100%'} />}
                </div>
            </div>

        </div>

    );
};

export default OverviewMain
