import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  /* other config options here */
};

export default nextConfig;