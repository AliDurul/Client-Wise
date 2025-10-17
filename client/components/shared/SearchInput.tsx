'use client';
import { SearchIcon } from '@/icons';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utility/functions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SearchInput({ className = '', placeholder = 'Search...' }: { className?: string, placeholder?: string }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const [query, setQuery] = useState('');

    // Initialize query state from URL params
    useEffect(() => {
        const urlQuery = searchParams.get('q') || '';
        setQuery(urlQuery);
    }, []);



    useEffect(() => {
        const delayBounceFn = setTimeout(() => {
            let newUrl = '';

            if (query) {
                // Remove page when searching to start from page 1
                const paramsWithoutPage = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['page']
                });

                newUrl = formUrlQuery({
                    params: paramsWithoutPage,
                    key: 'q',
                    value: query
                });
            } else {
                // Only remove query and page if query is actually empty
                // and there was a query in the URL before
                if (searchParams.get('q')) {
                    newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['q', 'page']
                    });
                } else {
                    return; // Don't update URL if there's no query to remove
                }
            }

            router.replace(newUrl, { scroll: false });
        }, 500);

        return () => clearTimeout(delayBounceFn);

    }, [query]);



    return (
        <div className='relative'>
            <input
                type="text"
                className={`peer form-input w-auto ${className}`}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary right-[20px] ">
                <SearchIcon />
            </div>
        </div>
    )
}
