import type { NextConfig } from "next";

const nextConfig: NextConfig = process.env.NODE_ENV === "development" ? {
  webpack: (config, { dev, isServer }: { config: any; dev: boolean; isServer: boolean }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
} : {};



export default nextConfig;