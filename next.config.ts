import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rollin.ng",
      },
      {
        protocol: "https",
        hostname: "www.rollin.ng",
      },
      {
        protocol: "https",
        hostname: "central.rollin.ng",
      },
      {
        protocol: "https",
        hostname: "www.central.rollin.ng",
      },
    ],
  },
};

export default nextConfig;