import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A stray lockfile lives in the home directory; pin the workspace root here.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
