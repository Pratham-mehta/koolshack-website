/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.carlogos.org',
      },
    ],
  },
}

module.exports = nextConfig