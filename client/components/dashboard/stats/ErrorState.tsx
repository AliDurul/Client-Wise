import React from 'react';

interface ErrorStateProps {
    error: string;
    onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] panel">
            <div className="text-center">
                <svg
                    className="mx-auto h-16 w-16 text-red-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Failed to Load Dashboard Stats
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    {error || 'An error occurred while fetching the dashboard statistics.'}
                </p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="btn btn-primary"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorState;
