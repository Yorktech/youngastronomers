/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/places-to-visit',
        destination: '/days-out',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
