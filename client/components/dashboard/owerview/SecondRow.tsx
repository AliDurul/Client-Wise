'use client';
import Dropdown from '@/components/layout/Dropdown'
import { createRevenueChart } from '@/constants/dashboard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import dynamic from 'next/dynamic';
import React from 'react'
import { formatDate } from '@/lib/utility/functions';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});


export default function SecondRow({ secondRowData }: any) {
    const revenueChart = createRevenueChart(
        secondRowData?.monthlyStats?.revenueSeries || [],
        secondRowData?.monthlyStats?.labels
    );
    const recentInvoices = secondRowData?.recentInvoices || [];
    // Income over the 12 months shown in the chart.
    const yearIncome: number = (revenueChart.series[0]?.data || []).reduce((sum: number, n: number) => sum + n, 0);

    // Map invoice status to colors
    const getStatusColors = (status: 'draft' | 'sent' | 'paid' | 'overdue' | 'closed' | 'refunded') => {
        const colorMap = {
            draft: { badge: 'badge-outline-secondary', bg: 'bg-secondary-light', bgDot: 'bg-secondary' },
            sent: { badge: 'badge-outline-info', bg: 'bg-info-light', bgDot: 'bg-info' },
            paid: { badge: 'badge-outline-success', bg: 'bg-success-light', bgDot: 'bg-success' },
            overdue: { badge: 'badge-outline-danger', bg: 'bg-danger-light', bgDot: 'bg-danger' },
            closed: { badge: 'badge-outline-dark', bg: 'bg-dark-light', bgDot: 'bg-dark' },
            refunded: { badge: 'badge-outline-warning', bg: 'bg-warning-light', bgDot: 'bg-warning' },
        };
        return colorMap[status] || { badge: 'badge-outline-primary', bg: 'bg-primary-light' };
    };

    return (
        <div className="mb-6 grid gap-6 xl:grid-cols-3">
            {/* Revenue Chart */}
            <div className="panel h-full col-span-3 md:col-span-2">
                <div className="mb-5 flex items-center justify-between dark:text-white-light">
                    <h5 className="text-lg font-semibold">Revenue</h5>
                    <div className="dropdown">
                        <Dropdown
                            offset={[0, 1]}
                            placement='bottom-end'
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
                                    <button type="button">Weekly</button>
                                </li>
                                <li>
                                    <button type="button">Monthly</button>
                                </li>
                                <li>
                                    <button type="button">Yearly</button>
                                </li>
                            </ul>
                        </Dropdown>
                    </div>
                </div>
                <p className="text-lg dark:text-white-light/90">
                    Total Profit <span className="ml-2 text-primary">${yearIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                </p>
                <div className="relative">
                    <div className="rounded-lg bg-white dark:bg-black">
                        {/* @ts-expect-error */}
                        <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={'100%'} />
                        {/* {isMounted ? ( // @ts-expect-error
                        ) : (
                            <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>

            {/* Recent invoices */}
            <div className="panel h-full pb-0 sm:col-span-2 xl:col-span-1">
                <h5 className="mb-5 text-lg font-semibold dark:text-white-light">Recent Sales</h5>
                <PerfectScrollbar className="relative -mr-3 mb-4 h-[290px] pr-3">
                    <div className="cursor-pointer text-sm">

                        {
                            recentInvoices.map((invoice: any, index: number) => {
                                const statusColors = getStatusColors(invoice.status);
                                return (
                                    <div key={index} className="group relative flex items-center py-1.5">
                                        <div className={`h-1.5 w-1.5 rounded-full ${statusColors.bgDot} ltr:mr-1 rtl:ml-1.5`}></div>
                                        <div className="flex-1">{invoice?.customer?.first_name ? invoice?.customer?.first_name : invoice?.customer?.company_name} {invoice?.customer?.last_name}</div>
                                        <div className="text-xs text-white-dark ltr:ml-auto rtl:mr-auto dark:text-gray-500">{formatDate(invoice.createdAt).slice(0, 6)}</div>
                                        <span className={`badge ${statusColors.badge} absolute ${statusColors.bg} text-xs opacity-0 group-hover:opacity-100 ltr:right-0 rtl:left-0 dark:bg-black`}>
                                            {invoice.status}
                                        </span>
                                    </div>
                                );
                            })
                        }

                    </div>
                </PerfectScrollbar>
                <div className="border-t border-white-light dark:border-white/10">
                    <button type="button" className="group group flex w-full items-center justify-center p-4 font-semibold hover:text-primary">
                        View All
                        <svg
                            className="h-4 w-4 transition duration-300 group-hover:translate-x-1 ltr:ml-1 rtl:mr-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}
