import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Client White',
        short_name: 'Client White',
        description: 'CRM and helpdesk for customers, leads, tickets and invoices.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4361ee',
        icons: [
            { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
            { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
        ],
    };
}
