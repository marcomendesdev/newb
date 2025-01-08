// filepath: /c:/Users/marco/OneDrive/Área de Trabalho/projects/new/newb/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  },
  /* other config options here */
};

export default nextConfig;