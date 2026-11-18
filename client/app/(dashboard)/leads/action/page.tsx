import LeadForm from '@/components/dashboard/lead/LeadForm';
import { getData } from '@/lib/features/shared/actionUtils';
import { Lead, PageSearchParams } from '@/types';



export default async function page({ searchParams }: PageSearchParams) {

    const params = await searchParams;

    const leadId = (params.id || '');
    const readOnly = params.s === 'r';
    const isEdit = params.s === 'e';

    let lead: Lead | null = null;
    let error = null;

    if ((readOnly || isEdit)) {
        try {
            const data = await getData(`leads/${leadId}`);
            if (data.success) {
                lead = data.result;
            } else {
                error = data.message;
            }
        } catch (error) {
            error = 'Failed to fetch lead details';
        }
    }


    return (
        <LeadForm lead={lead} readOnly={readOnly} isEdit={isEdit} error={error} />
    )
}
