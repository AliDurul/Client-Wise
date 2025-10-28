import CustomerHeaderBtns from "@/components/dashboard/customer/CustomerHeaderBtns";
import CustomerTable from "@/components/dashboard/customer/CustomerTable";
import { ClientErrorBoundary } from "@/components/shared/ClientErrorBoundary";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { TableSkeleton } from "@/components/shared/Skeletons";
import TopPageNavigation from "@/components/shared/TopPageNavigation";
import { getAllData } from "@/lib/features/shared/actionUtils";
import { PageSearchParams } from "@/types";
import { Suspense } from "react";



export default async function page({ searchParams }: PageSearchParams) {


    const params = await searchParams;
    const query = params.q || '';
    const page = params.p || '1';
    const limit = params.pl || '20';
    const sortBy = params.sb || 'first_name';
    const sort = params.s || 'asc';
    const customer_type = params.ct || 'individual';

    const customerPromise = getAllData({
        url: 'customers/',
        searchQueries: { 'first_name': query },
        filterQueries: { customer_type },
        customQuery: { page, limit },
        sortQueries: { [sortBy]: sort }
    });



    return (
        <>
           
            {/* <div className="panel mt-5 border-white-light px-0 dark:border-[#1b2e4b]">
                <Suspense fallback={<TableSkeleton />}>
                    <CustomerTable customerPromise={customerPromise} />
                </Suspense>
            </div> */}
           <TableSkeleton /> 
        </>
    )
}
