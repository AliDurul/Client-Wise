import TaskAddEditModal from '@/components/dashboard/task/TaskAddEditModal';
import TaskMain from '@/components/dashboard/task/TaskMain';
import TaskSidebar from '@/components/dashboard/task/TaskSideBar';
import { TaskMainSkeleton, TaskSidebarSkeleton } from '@/components/shared/Skeletons';
import TopPageNavigation from '@/components/shared/TopPageNavigation'
import { PageSearchParams } from '@/types';
import React, { Suspense } from 'react'

export default async function page({ searchParams }: PageSearchParams) {


    return (
        <>
            <TopPageNavigation />

            <div className="relative flex h-full gap-5 mt-4 sm:h-[calc(100vh-160px)]">
                <Suspense fallback={<TaskSidebarSkeleton />}>
                    <TaskSidebar />
                </Suspense>


                <Suspense fallback={<TaskMainSkeleton />}>
                    <TaskMain searchParams={searchParams} />
                </Suspense>


            </div>


        </>
    )
}
