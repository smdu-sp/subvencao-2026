import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["shapefile", "text-encoding", "better-sqlite3"],
};

export default nextConfig;
