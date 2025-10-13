import { Pages, ResDetails } from '@/types';
import { useUrlParams } from './useUrlParams';

const usePagination = (details: ResDetails, searchParams?: URLSearchParams) => {
    const { getParam, updateUrlParams } = useUrlParams();

    const getPaginationText = () => {
        if (!details || details.totalRecords === 0) {
            return '0-0 of 0';
        }

        const startRecord = Math.max(1, (details.page - 1) * details.limit + 1);
        const endRecord = Math.min(details.page * details.limit, details.totalRecords);

        return `${startRecord}-${endRecord} of ${details.totalRecords}`;
    };

    const hasValidPagination = (pages: any): pages is any => {
        return pages !== undefined && pages !== false && typeof pages === 'object';
    };

    const handlePreviousPage = () => {
        if(details?.pages === null) return;

        if (!hasValidPagination(details?.pages) || details?.pages?.current <= 1) {
            return;
        }
        updateUrlParams({ page: (details?.pages.current - 1).toString() }, { replace: true });

    };

    const handleNextPage = () => {
        if (details?.pages === null) return;
        
        if (!hasValidPagination(details?.pages) || details?.pages?.current >= details?.pages?.total) {
            return;
        }

        // const newUrl = formUrlQuery({
        //     params: searchParams.toString(),
        //     key: 'page',
        //     value: (details.pages.current + 1).toString()
        // });
        // router.replace(newUrl, { scroll: false });

        updateUrlParams({ page: (details.pages.current + 1).toString() }, { replace: true });

    };

    const isPreviousDisabled =
        !hasValidPagination(details?.pages) ||
        typeof details?.pages?.current !== 'number' ||
        details.pages.current <= 1;

    const isNextDisabled =
        !hasValidPagination(details?.pages) ||
        typeof details?.pages?.current !== 'number' ||
        typeof details?.pages?.total !== 'number' ||
        details.pages.current >= details.pages.total;

    return {
        getPaginationText,
        handlePreviousPage,
        handleNextPage,
        isPreviousDisabled,
        isNextDisabled,
    };
};

export default usePagination;