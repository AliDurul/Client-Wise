'use client';
import { getAllData } from '@/lib/features/shared/actionUtils';
import React from 'react'
import toast from 'react-hot-toast';
import { SWRConfig } from 'swr'


const fetcher = async ([key, params]: [string, any]) => getAllData(params);

export default function SwrProvider({ children }: { children: React.ReactNode }) {

    return (
        <SWRConfig value={{
            fetcher,
            // dedupingInterval: 1000,
            // refreshInterval: 5000,
            // revalidateOnFocus: true,
            // revalidateOnReconnect: true,
            // shouldRetryOnError: false,
            // errorRetryInterval: 3000,
            // errorRetryCount: 2,
            onError: (err) => {
                toast.error(`SWR Error: ${err.message}`);
            },
            onSuccess: (data) => {
                // toast.success(`SWR Success: ${data.message}`);
            },
        }}>
            {children}
        </SWRConfig>
    )
}
