import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["shapefile", "text-encoding", "better-sqlite3"],
};

export default nextConfig;
