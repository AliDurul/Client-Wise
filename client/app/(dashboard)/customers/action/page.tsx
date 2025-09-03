import CustomerForm from '@/components/dashboard/customer/CustomerForm';
import TopPageNavigation from '@/components/shared/TopPageNavigation';
import { getData } from '@/lib/features/shared/actionUtils';
import { Customer, PageSearchParams } from '@/types';
import { Suspense } from 'react';



export default async function page({ searchParams }: PageSearchParams) {

    const params = await searchParams;

    const userId = (params.id || '');
    const readOnly = params.s === 'r';
    const isEdit = params.s === 'e';

    let customer: Customer | null = null;
    let error = null;

    if ((readOnly || isEdit)) {
        try {
            const data = await getData(`customers/${userId}`);
            if (data.success) {
                customer = data.result;
            } else {
                error = data.message;
            }
        } catch (error) {
            error = 'Failed to fetch KYC details';
        }
    }


    return (
        <CustomerForm customer={customer} readOnly={readOnly} isEdit={isEdit} error={error} />
    )
}
