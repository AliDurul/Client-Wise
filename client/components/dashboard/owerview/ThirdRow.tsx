import dynamic from 'next/dynamic';
import { createLeadChart, createTicketChart, createTotalSaleChart, engagement, referral, } from '@/constants/dashboard';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export default function ThirdRow({ thirdRowData }: any) {

    const saleChartData = createTotalSaleChart(thirdRowData?.countSales);
    const ticketChartData = createTicketChart(thirdRowData?.countTickets);
    const leadChartData = createLeadChart(thirdRowData?.countLeads);



    return (
        <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            <div className="panel h-full p-0">
                <div className="flex p-5 justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                            <path opacity="0.5" d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path opacity="0.5" d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <ellipse cx="12" cy="17" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" />
                            <path opacity="0.5" d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path opacity="0.5" d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="font-semibold ltr:ml-3 rtl:mr-3 dark:text-white-light">
                        <p className="text-xl dark:text-white-light">{thirdRowData?.totalTickets}</p>
                        <span className="block text-sm font-normal">Tickets Count</span>

                    </div>
                </div>
                <div className="h-40">
                    {/* @ts-ignore */}
                    <ReactApexChart series={ticketChartData.series} options={ticketChartData.options} type="area" height={160} width={'100%'} className="absolute bottom-0 w-full" />
                </div>
            </div>


            <div className="panel h-full p-0">
                <div className="flex p-5 justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/10 text-danger dark:bg-danger dark:text-white-light">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.0464 14C8.54044 12.4882 8.67609 9.90087 10.3494 8.22108L15.197 3.35462C16.8703 1.67483 19.4476 1.53865 20.9536 3.05046C22.4596 4.56228 22.3239 7.14956 20.6506 8.82935L18.2268 11.2626"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                            <path
                                opacity="0.5"
                                d="M13.9536 10C15.4596 11.5118 15.3239 14.0991 13.6506 15.7789L11.2268 18.2121L8.80299 20.6454C7.12969 22.3252 4.55237 22.4613 3.0464 20.9495C1.54043 19.4377 1.67609 16.8504 3.34939 15.1706L5.77323 12.7373"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <div className="font-semibold ltr:ml-3 rtl:mr-3 dark:text-white-light">
                        <p className="text-xl dark:text-white-light">{thirdRowData?.totalLeads}</p>
                        <span className="block text-sm font-normal">Leads Count</span>

                    </div>
                </div>
                <div className="h-40">
                    {/* @ts-ignore */}
                    <ReactApexChart series={leadChartData.series} options={leadChartData.options} type="area" height={160} width={'100%'} className="absolute bottom-0 w-full" />
                </div>
            </div>

            <div className="panel h-full p-0">
                <div className="absolute flex w-full items-center justify-between p-5">
                    <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-success-light text-success dark:bg-success dark:text-success-light">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path
                                    opacity="0.5"
                                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    opacity="0.5"
                                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path opacity="0.5" d="M11 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                    d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                    </div>
                    <h5 className="text-2xl font-semibold ltr:text-right rtl:text-left dark:text-white-light">
                        {thirdRowData.totalSales}
                        <span className="block text-sm font-normal">Sales Count</span>
                    </h5>
                </div>
                <div className="rounded-lg bg-transparent">
                    {/* @ts-ignore */}
                    <ReactApexChart series={saleChartData.series} options={saleChartData.options} type="area" height={290} width={'100%'} />
                </div>
            </div>
        </div>
    )
}
