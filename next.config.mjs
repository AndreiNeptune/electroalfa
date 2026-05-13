/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'electroalfa.ro',
      },
    ],
  },
  async redirects() {
    return [
      // 301 Redirects for Legacy Product Pages
      {
        source: '/produse-servicii/:slug',
        destination: '/ro/products/all/:slug',
        permanent: true,
      },
      // Locale-Aware Redirects
      {
        source: '/en/products/:slug',
        destination: '/en/products/all/:slug',
        permanent: true,
      },
      // Investor Relations Bridge
      {
        source: '/investitori/:category',
        destination: '/ro/investors/:category',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
