/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { tsconfigPath: 'tsconfig.next.json' },
  images: { unoptimized: true },
};

module.exports = nextConfig;
