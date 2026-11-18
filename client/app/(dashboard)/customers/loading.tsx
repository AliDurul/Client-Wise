import { TableSkeleton } from '@/components/shared/Skeletons'
import React from 'react'

export default function Loading() {
    return (
        <div className="panel mt-5 border-white-light px-0 dark:border-[#1b2e4b]">
            <TableSkeleton />
        </div>
    )
}
