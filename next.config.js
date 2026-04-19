import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Pin Turbopack's workspace root to this project. Without this, a stray
  // package-lock.json in a parent directory (e.g. ~/package-lock.json on the
  // prod EC2 host) makes Next walk the entire home directory during the
  // TypeScript step, which can stall the build for many minutes.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
