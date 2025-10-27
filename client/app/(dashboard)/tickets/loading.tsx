import { StatSkeleton, TableSkeleton } from '@/components/shared/Skeletons'
import React from 'react'

export default function loading() {
    return (
        <div className='pt-5'>
            <div className='panel mb-5'>
                <StatSkeleton />
            </div>
            <div className='panel mb-5'>
                <TableSkeleton />
            </div>
        </div>
    )
}
