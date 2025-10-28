
export function TableSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {/* table header skeleton */}
            <div className="flex justify-between mb-5 px-2 ">
                <div className="h-10 w-1/5 rounded-lg bg-gray-200 dark:bg-gray-700 " />
                <div className="h-10 w-1/5 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="mb-3 grid grid-cols-4 gap-4 ">
                <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                <div className="h-8 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-8 rounded bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* table body skeleton */}
            <div className="rounded-md   overflow-hidden">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`grid grid-cols-4 gap-4 py-3 border-t  dark:border-slate-700 `}>

                        <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                        <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                        <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                        <div className="h-8 rounded bg-gray-200 dark:bg-gray-700 " />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function StatSkeleton() {
    return (
        <div className="w-full flex gap-4 animate-pulse p-2 rounded-lg">
            <div className="h-14 w-2/12 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-14 w-2/12  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-14 w-2/12  rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-14 w-2/12 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-14 w-2/12 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-14 w-2/12 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
    )
}

export function TaskSidebarSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-4">
            <div className="h-12 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

            <div className="p-2 bg-white dark:bg-gray-800 rounded shadow-sm">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-3 border-b last:border-b-0">
                        <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="flex-1">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function TaskMainSkeleton() {
    return (
        <div className="w-full animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />

            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm">
                <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>

                <div className="space-y-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="border-t dark:border-slate-700 pt-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}