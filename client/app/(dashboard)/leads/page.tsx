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

    const leads = await getAllData({
        url: 'leads/',
        searchQueries: { 'first_name': query },
        customQuery: { page, limit },
        sortQueries: { [sortBy]: sort }
    });



    return (
        <>
            <LeadTable leads={leads} />
        </>
    )
}
