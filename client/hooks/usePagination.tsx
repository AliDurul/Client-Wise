import { useUrlParams } from './useUrlParams';

const usePagination = (pagination: any | undefined, searchParams?: URLSearchParams) => {
    const { getParam, updateUrlParams } = useUrlParams();

    const getPaginationText = () => {
        if (!pagination || pagination.totalRecords === 0) {
            return '0-0 of 0';
        }

        const startRecord = Math.max(1, (pagination.page - 1) * pagination.limit + 1);
        const endRecord = Math.min(pagination.page * pagination.limit, pagination.totalRecords);

        return `${startRecord}-${endRecord} of ${pagination.totalRecords}`;
    };

    const hasValidPagination = (pages: any | boolean | undefined): pages is any => {
        return pages !== undefined && pages !== false && typeof pages === 'object';
    };

    const handlePreviousPage = () => {
        if (!hasValidPagination(pagination?.pages) || pagination.pages.current <= 1) {
            return;
        }

        // const newUrl = formUrlQuery({
        //     params: searchParams.toString(),
        //     key: 'page',
        //     value: (pagination.pages.current - 1).toString()
        // });
        // router.replace(newUrl, { scroll: false });

        updateUrlParams({ page: (pagination.pages.current - 1).toString() }, { replace: true });

    };

    const handleNextPage = () => {
        if (!hasValidPagination(pagination?.pages) || pagination.pages.current >= pagination.pages.total) {
            return;
        }

        // const newUrl = formUrlQuery({
        //     params: searchParams.toString(),
        //     key: 'page',
        //     value: (details.pages.current + 1).toString()
        // });
        // router.replace(newUrl, { scroll: false });

        updateUrlParams({ page: (pagination.pages.current + 1).toString() }, { replace: true });

    };

    const isPreviousDisabled = !hasValidPagination(pagination?.pages) || pagination.pages.current <= 1;
    const isNextDisabled = !hasValidPagination(pagination?.pages) || pagination.pages.current >= pagination.pages.total;

    return {
        getPaginationText,
        handlePreviousPage,
        handleNextPage,
        isPreviousDisabled,
        isNextDisabled,
    };
};

export default usePagination;