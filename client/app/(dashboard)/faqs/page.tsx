import FaqCreateBtn from '@/components/dashboard/faq/FaqCreateBtn'
import FaqList from '@/components/dashboard/faq/FaqList'
import FaqModal from '@/components/dashboard/faq/FaqModal'
import NoDataFound from '@/components/shared/NoDataFound'
import SearchInput from '@/components/shared/SearchInput'
import { getAllData } from '@/lib/features/shared/actionUtils'
import React from 'react'

export default async function page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const sp = await searchParams
    const query = sp?.q as string | undefined

    const faqs = await getAllData({ url: 'faqs/', searchQueries: { 'question': query } });

    return (
        <div>
            {/* <TopPageNavigation /> */}

            <div className="pt-5">
                <div className='flex justify-between items-center max-w-[80%] mx-auto'>
                    <div>
                        <h2 className="text-center text-xl font-bold md:text-3xl mb-2">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h2>
                        <FaqCreateBtn />
                    </div>
                    <SearchInput />
                </div>
            </div>

            {
                faqs?.result?.length > 0 ? (<FaqList faqs={faqs.result} />) : (<NoDataFound msg={'No FAQs found.'} />)
            }
            <FaqModal />

        </div>
    )
}
