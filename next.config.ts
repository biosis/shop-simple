import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "files.stripe.com" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
