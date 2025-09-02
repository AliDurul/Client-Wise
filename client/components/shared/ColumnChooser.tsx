import React from 'react';
import Dropdown from '../layout/Dropdown';
import { useDataTable } from '@/hooks/useDataTable';

interface ColumnChooserProps {
    cols: { accessor: string; title: string }[];
}

export default function ColumnChooser({ cols }: ColumnChooserProps) {
    const { hiddenColumns, toggleColumnVisibility } = useDataTable();
    return (
        <div className="dropdown">
            <Dropdown
                placement='bottom-start'
                btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                button={
                    <>
                        <span className="ltr:mr-1 rtl:ml-1">Columns</span>
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </>
                }
            >
                <ul className="!min-w-[140px]">
                    {cols.map((col, i) => (
                        <li
                            key={i}
                            className="flex flex-col"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <div className="flex items-center px-4 py-1">
                                <label className="mb-0 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={!hiddenColumns.includes(col.accessor)}
                                        className="form-checkbox"
                                        value={col.accessor}
                                        onChange={() => toggleColumnVisibility(col.accessor)}
                                    />
                                    <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </Dropdown>
        </div>
    );
}
