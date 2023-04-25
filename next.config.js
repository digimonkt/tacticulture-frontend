/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
    ];
  },
};

module.exports = nextConfig;
