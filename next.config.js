/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["203.190.153.23"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["next/babel"], // Use the preset for Next.js
        },
      },
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactStrictMode: true,
  transpileModules: ["react-timezone-select"], // Use 'transpileModules' instead of 'transpilePackages'
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/verify-token",
        destination: "/auth/verify-token",
      },
      {
        source: "/login/manual",
        destination: "/auth/login/manual",
      },
      {
        source: "/email-sent",
        destination: "/auth/email-sent",
      },
      {
        source: "/reset-email-sent",
        destination: "/auth/reset-email-sent",
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
      {
        source: "/event-summary",
        destination: "/event-summary/",
      },
      {
        source: "/embed-body",
        destination: "/embed-body/",
      },
    ];
  },
};

module.exports = nextConfig;
