import React from "react";

export default function OverviewSkeleton() {
    return (
        <div className="space-y-6 pt-5" aria-busy="true">
            {/* Top stats */}
            <div className="mb-6 grid grid-cols-1 gap-6  sm:grid-cols-2 xl:grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="p-4 h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                    >
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse mb-4" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                    </div>
                ))}
            </div>

            <div className="mb-6 grid gap-6 xl:grid-cols-3">
                <div className="bg-white dark:bg-gray-800  xl:col-span-2 h-96" />
                <div className="bg-white dark:bg-gray-800  sm:col-span-2 xl:col-span-1 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                    </div>
                    <div className="space-y-3 ">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                                </div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div className="h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse" />
                <div className="h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse" />
                <div className="h-40 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse" />
            </div>



            {/* Main grid: left (two-thirds) and right (one-third) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    {/* Recent activity / messages list skeleton */}
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
                        </div>

                        <div className="space-y-3">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
                                    </div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <aside className="space-y-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
                        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>

                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
                        <div className="space-y-3">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
