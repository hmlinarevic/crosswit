/** @type {import('next').NextConfig} */
const basePath =
  process.env.NODE_ENV === "production" ? "/projects/crosswit" : "";

const nextConfig = {
  reactStrictMode: true,
  ...(basePath && { basePath }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Next 16: Turbopack is default for dev + build. Use `next build --webpack` to opt out.
};

module.exports = nextConfig;
