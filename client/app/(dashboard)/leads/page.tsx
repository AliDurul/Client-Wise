import CustomerHeaderBtns from "@/components/dashboard/customer/CustomerHeaderBtns";
import CustomerTable from "@/components/dashboard/customer/CustomerTable";
import LeadTable from "@/components/dashboard/lead/LeadTable";
import { ClientErrorBoundary } from "@/components/shared/ClientErrorBoundary";
import TopPageNavigation from "@/components/shared/TopPageNavigation";
import { getAllData } from "@/lib/features/shared/actionUtils";
import { PageSearchParams } from "@/types";
import { Suspense } from "react";



export default async function page({ searchParams }: PageSearchParams) {


    const params = await searchParams;
    const query = params.q || '';
    const page = params.p || '1';
    const limit = params.pl || '20';
    const sortBy = params.sb || 'createdAt';
    const sort = params.s || 'desc';

    const leadPromise = getAllData({
        url: 'leads/',
        searchQueries: { 'first_name': query },
        customQuery: { page, limit },
        sortQueries: { [sortBy]: sort }
    });



    return (
        <>

            <div className="panel mt-5 border-white-light px-0 dark:border-[#1b2e4b]">

                {/* <ClientErrorBoundary> */}
                <Suspense fallback={<div className="flex h-full items-center justify-center">Loading...</div>}>
                    <LeadTable leadPromise={leadPromise} />
                </Suspense>
                {/* </ClientErrorBoundary> */}
            </div>

        </>
    )
}
