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
      {
        source: "/login/manual",
        destination: "/auth/login/manual",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
      {
        source: "/reset-password/verify-email",
        destination: "/auth/reset-password/verify-email",
      },
      {
        source: "/confirm-email",
        destination: "/auth/confirm-email",
      },
      {
        source: "/create-account",
        destination: "/auth/create-account",
      },
      {
        source: "/verify-email",
        destination: "/auth/verify-email",
      },
    ];
  },
};

module.exports = nextConfig;
