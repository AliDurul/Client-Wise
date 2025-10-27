import FaqCreateBtn from '@/components/dashboard/faq/FaqCreateBtn'
import SearchInput from '@/components/shared/SearchInput'
import { EditIcon } from '@/icons'
import React, { Suspense } from 'react'

export default function loading() {
    return (
        <div className="space-y-5 pt-5 animate-pulse">
            {/* Header: title + create button + search */}
            <div className='flex justify-between items-center max-w-[80%] mx-auto'>
                <div>
                    <h2 className="text-center text-xl font-bold md:text-3xl mb-2">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h2>
                    <FaqCreateBtn />
                </div>
                <Suspense>
                    <SearchInput />
                </Suspense>
            </div>

            {/* List area */}
            <div className="max-w-[80%] mx-auto space-y-5 ">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <FaqItemSkeleton key={idx} />
                ))}
            </div>
        </div>
    )
}

function FaqItemSkeleton() {
    return (
        <div className="panel rounded h-16 animate-pulse flex items-center justify-between px-5">
            <div className='bg-gray-200 dark:bg-gray-700 w-2/4 h-5 rounded-xl'></div>
            <div className=' '>
                <svg className={`h-5 w-5 `} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}