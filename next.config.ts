import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "google.com",
      "www.google.com",
      "images.unsplash.com",
      "cdn.example.com",
      // Add other domains as needed
    ],
  },
};

export default nextConfig;
