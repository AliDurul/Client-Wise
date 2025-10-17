
export function TableSkeleton() {
    return (
        <div className="w-full animate-pulse px-4">
            {/* table header skeleton */}
            <div className="flex justify-between mb-10 ">
                <div className="h-8 w-1/4 rounded bg-gray-400 " />
                <div className="h-8 w-1/4 rounded bg-gray-400" />

            </div>
            <div className="mb-3 grid grid-cols-4 gap-4 ">
                <div className="h-6 rounded bg-gray-400 " />
                <div className="h-6 rounded bg-gray-400 " />
                <div className="h-6 rounded bg-gray-400" />
                <div className="h-6 rounded bg-gray-400" />
            </div>

            {/* table body skeleton */}
            <div className="rounded-md  border-gray-400 overflow-hidden">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                        key={idx}
                        className={`grid grid-cols-4 gap-4 py-3 border-t  ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }`}
                    >
                        <div className="h-4 rounded bg-gray-400 " />
                        <div className="h-4 rounded bg-gray-400 " />
                        <div className="h-4 rounded bg-gray-400 " />
                        <div className="h-4 rounded bg-gray-400 " />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function StatSkeleton() {
    return (
        <div className="w-full flex gap-4 animate-pulse p-4 border border-gray-300 rounded-md">
            <div className="h-20 w-2/12 rounded bg-gray-400" />
            <div className="h-20 w-2/12  rounded bg-gray-400" />
            <div className="h-20 w-2/12  rounded bg-gray-400" />
            <div className="h-20 w-2/12 rounded bg-gray-400" />
            <div className="h-20 w-2/12 rounded bg-gray-400" />
            <div className="h-20 w-2/12 rounded bg-gray-400" />
        </div>
    )
}