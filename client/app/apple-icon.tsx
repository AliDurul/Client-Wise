import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div style={{ width: '100%', height: '100%', background: '#4361ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
                    <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="22" cy="16" r="2.2" fill="#fff" />
                </svg>
            </div>
        ),
        size,
    );
}
