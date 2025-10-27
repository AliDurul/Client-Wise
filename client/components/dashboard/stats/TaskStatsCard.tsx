import React from 'react';
import Dropdown from '@/components/layout/Dropdown';

interface TaskStatsProps {
    data?: {
        total: number;
        new: number;
        completed: number;
        pending: number;
        completionRate: number;
        lastWeek: number;
    };
}

const TaskStatsCard: React.FC<TaskStatsProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
            <div className="flex justify-between">
                <div className="text-md font-semibold ltr:mr-1 rtl:ml-1 text-white">
                    Total Tasks
                </div>
                <div className="dropdown">
                    <Dropdown
                        offset={[0, 5]}
                        placement="bottom-end"
                        btnClassName="hover:text-primary"
                        button={
                            <svg
                                className="h-5 w-5 opacity-70 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        }
                    >
                        <ul className="text-black dark:text-white-dark">
                            <li>
                                <button type="button">View Report</button>
                            </li>
                            <li>
                                <button type="button">View All Tasks</button>
                            </li>
                            <li>
                                <button type="button">Export Data</button>
                            </li>
                        </ul>
                    </Dropdown>
                </div>
            </div>

            <div className="mt-5 flex items-center">
                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-white">
                    {data.total.toLocaleString()}
                </div>
                <div className="badge bg-white/30">
                    {data.completionRate}% Done
                </div>
            </div>

            <div className="mt-5 flex items-center font-semibold text-white">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ltr:mr-2 rtl:ml-2"
                >
                    <path
                        opacity="0.5"
                        d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
                Last Week: {data.lastWeek.toLocaleString()}
            </div>

            {/* Additional Info */}
            <div className="mt-4 flex items-center justify-between text-sm text-white/80">
                <div>
                    <div className="font-medium">Pending</div>
                    <div className="text-lg font-bold">{data.pending}</div>
                </div>
                <div>
                    <div className="font-medium">Completed</div>
                    <div className="text-lg font-bold">{data.completed}</div>
                </div>
                <div>
                    <div className="font-medium">New</div>
                    <div className="text-lg font-bold">{data.new}</div>
                </div>
            </div>
        </div>
    );
};

export default TaskStatsCard;
