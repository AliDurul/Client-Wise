import { ImageResponse } from 'next/og';

export const alt = 'Client White: CRM and helpdesk';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 72,
                    background: '#f1f4fb',
                    color: '#0f172a',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: '#4361ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                            <path d="M21.5 11.2A7 7 0 1 0 21.5 20.8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="22" cy="16" r="2.2" fill="#fff" />
                        </svg>
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 800 }}>Client White</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
                        Every client, every deal, in one clear view.
                    </div>
                    <div style={{ fontSize: 32, color: '#475569', marginTop: 28 }}>
                        Customers, leads, tickets, invoices and email in one CRM.
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
