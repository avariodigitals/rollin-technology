import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;