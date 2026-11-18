import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// Only public pages belong here. The dashboard sits behind login.
export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: `${siteUrl}/login`, changeFrequency: 'monthly', priority: 1 }];
}
