import type { NextConfig } from 'next';

// Static export for GitHub Pages. With trailingSlash off, /register builds to
// out/register.html, so the old *.html URLs (and the OAuth callback URL) keep working.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
