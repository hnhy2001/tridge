/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['images.tridge.com', 'intphcm.com', 'www.vietnamworks.com', 'localhost'],
  },
};

export default nextConfig;
