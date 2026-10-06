import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Cloudflare Pages static export — no server runtime, no Node-only APIs.
  output: 'export',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default withMDX(config);