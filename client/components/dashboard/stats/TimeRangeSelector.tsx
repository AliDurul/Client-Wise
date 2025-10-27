import React from 'react';

interface TimeRangeSelectorProps {
    value: string;
    onChange: (range: string) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({ value, onChange }) => {
    const ranges = [
        { label: '7 Days', value: '7d' },
        { label: '30 Days', value: '30d' },
        { label: '90 Days', value: '90d' },
        { label: '1 Year', value: '1y' },
    ];

    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Dashboard Overview
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monitor your business metrics and performance
                </p>
            </div>
            <div className="flex gap-2">
                {ranges.map((range) => (
                    <button
                        key={range.value}
                        onClick={() => onChange(range.value)}
                        className={`
                            px-4 py-2 rounded-lg font-medium text-sm transition-all
                            ${
                                value === range.value
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }
                        `}
                    >
                        {range.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeRangeSelector;
