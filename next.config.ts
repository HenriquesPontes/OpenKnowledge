import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep dev/build artifacts isolated so multiple dev attempts don't contend
  // over the same `.next/dev/lock` file.
  distDir: ".next-alt-run",
  /* config options here */
};

export default nextConfig;
