import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.31.240.1', 'localhost'],
  output: "standalone",
};

export default nextConfig;
