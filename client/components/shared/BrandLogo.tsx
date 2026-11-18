import React from 'react';

type Props = {
    className?: string;
    /** Size of the mark in px. */
    size?: number;
    /** Hide the wordmark and show only the mark. */
    markOnly?: boolean;
};

/** Client White wordmark. SVG, so it follows the current text color in light and dark mode. */
export default function BrandLogo({ className = '', size = 32, markOnly = false }: Props) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect width="32" height="32" rx="9" fill="#4361ee" />
                <path
                    d="M21.5 11.2A7 7 0 1 0 21.5 20.8"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <circle cx="22" cy="16" r="2.2" fill="#fff" />
            </svg>
            {!markOnly && (
                <span className="text-xl font-extrabold tracking-tight">
                    Client<span className="font-medium opacity-70"> White</span>
                </span>
            )}
        </span>
    );
}
