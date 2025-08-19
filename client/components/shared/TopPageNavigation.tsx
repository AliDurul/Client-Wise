'use client'
import { capitalize } from '@/lib/utility/functions';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const TopPageNavigation = () => {
    const pathName = usePathname();
    const segments = pathName.split('/').filter(Boolean);

    const breadcrumbItems = segments.map((segment, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/');
        const isLast = idx === segments.length - 1;
        return (
            <li
                key={idx}
                className="before:w-1 before:h-1 before:rounded-full before:bg-primary before:inline-block before:relative before:-top-0.5 before:mx-4"
            >
                {isLast ? (
                    <span className="text-primary truncate">{segment.length > 12 ? segment.slice(0, 12) + '..' : capitalize(segment)}</span>
                ) : (
                    <Link
                        href={href}
                        className="hover:text-gray-500/70 dark:hover:text-white-dark/70"
                    >
                        {segment.length > 12 ? segment.slice(0, 12) + '..' : capitalize(segment)}
                    </Link>
                )}
            </li>
        );
    });

    return (
        <ol className="flex pl-1 text-gray-500 font-semibold dark:text-white-dark ">
            <li>
                <Link href='/' className="hover:text-gray-500/70 dark:hover:text-white-dark/70">Dashboard</Link>
            </li>
            {breadcrumbItems}
        </ol>
    );
}

export default TopPageNavigation