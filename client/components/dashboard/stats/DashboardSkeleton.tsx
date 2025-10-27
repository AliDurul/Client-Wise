import React from 'react';

interface DashboardSkeletonProps {
    cards?: number;
}

const DashboardSkeleton: React.FC<DashboardSkeletonProps> = ({ cards = 4 }) => {
    return (
        <div className="pt-5">
            {/* Time Range Skeleton */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
                    <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                        />
                    ))}
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: cards }).map((_, index) => (
                    <div
                        key={index}
                        className="panel bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse"
                    >
                        <div className="flex justify-between mb-4">
                            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded mr-3" />
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded mr-2" />
                            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
                        </div>
                        <div className="flex justify-between">
                            <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                            <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                            <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSkeleton;
