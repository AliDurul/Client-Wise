import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Email, Pagination } from "@/types";
import useSWR from "swr";
import { useUrlParams } from "./useUrlParams";
import { getAllData } from "@/lib/features/shared/actionUtils";
import toast from "react-hot-toast";
import { setFilteredEmails } from "@/lib/features/email/emailSlice";
import { useCallback, useRef, useState, useEffect } from "react";

export default function useEmails() {

    const { getParam, updateUrlParams } = useUrlParams();
    const dispatch = useAppDispatch();


    const page = Number(getParam('page', '1'));
    const selectedTab = getParam('tab', 'INBOX');

    // Persist token history per tab so navigating away and back preserves it
    const STORAGE_KEY = `emails_tokenHistory_${selectedTab}`;

    // Read persisted history synchronously (prevent undefined token on initial render)
    let initialHistory: Record<string, string | null> = { '1': null };
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                // handle accidental nesting like { current: { '1': ... } }
                if (parsed.current && typeof parsed.current === 'object') {
                    initialHistory = parsed.current;
                } else {
                    initialHistory = parsed;
                }
            }
        }
    } catch (e) {
        initialHistory = { '1': null };
    }

    const tokenHistory = useRef<Record<number, string | null>>(initialHistory as unknown as Record<number, string | null>);
    // const [activePageToken, setActivePageToken] = useState<string | null >(tokenHistory.current[page] ?? null);

    // Whenever page changes, ensure active token is synced to the history for that page
    // useEffect(() => {
    //     setActivePageToken(tokenHistory.current[page] ?? null);
    // }, [page]);

    // helper to persist history - merge to avoid overwrites and ensure flat structure
    const persistHistory = useCallback(() => {
        try {
            const raw = sessionStorage.getItem(STORAGE_KEY);
            let existing: Record<string, string | null> = {};
            if (raw) {
                try {
                    const parsed = JSON.parse(raw);
                    if (parsed && typeof parsed === 'object') {
                        existing = parsed.current && typeof parsed.current === 'object' ? parsed.current : parsed;
                    }
                } catch (e) {
                    existing = {};
                }
            }

            const merged = { ...existing, ...tokenHistory.current } as Record<string, string | null>;
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            tokenHistory.current = merged as unknown as Record<number, string | null>;
        } catch (err) {
            // ignore
        }
    }, [STORAGE_KEY]);


    const getAllDataOp = useCallback(() => {
        return {
            url: 'emails',
            customQuery: {
                labelIds: selectedTab
                    ? selectedTab === 'UPDATES'
                        ? 'CATEGORY_UPDATES'
                        : selectedTab === 'FORUMS'
                            ? 'CATEGORY_FORUMS'
                            : selectedTab
                    : 'INBOX',
                page: page ?? '1',
                pageToken: tokenHistory.current[page] ?? undefined,
            }
        };
    }, [page, selectedTab]);


    const { data, error, isLoading, isValidating, mutate } = useSWR<Pagination<Email>>(
        [selectedTab ? `emails/${selectedTab}` : null, page],
        () => getAllData(getAllDataOp()),
        {
            onError: (err) => {
                toast.error(err?.message ?? 'Error fetching emails', { duration: 3000 });
            },
            onSuccess: (data) => {
                dispatch(setFilteredEmails(data || []));
            },
            revalidateOnFocus: false,
        }
    );

    // When data arrives, cache the nextPageToken for page+1
    if (data && data.details) {
        const pages = data.details.pages;
        // store token for next page (which fetches page+1)
        if (pages && pages.nextPageToken) {
            tokenHistory.current[page + 1] = pages.nextPageToken;
        }
        // also store previousPageToken for page-1 (if provided)
        if (pages && pages.previousPageToken) {
            tokenHistory.current[page - 1] = pages.previousPageToken;
        }
        // persist updated history
        persistHistory();
    }

    const next = useCallback(() => {
        const nextPage = page + 1;
        const token = tokenHistory.current[nextPage];
        // setActivePageToken(token ?? null);
        updateUrlParams({ page: (nextPage).toString() }, { replace: true });

        // setPage(nextPage);
    }, [page]);

    const prev = useCallback(() => {
        if (page <= 1) return;
        const prevPage = page - 1;
        const token = tokenHistory.current[prevPage];
        // setActivePageToken(token ?? null);
        updateUrlParams({ page: (prevPage).toString() }, { replace: true });

    }, [page]);


    return { emails: data, isLoading, error, tokenHistory: tokenHistory.current, next, prev, isValidating, mutate };

}