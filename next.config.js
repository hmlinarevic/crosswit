/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only in production (millify.dev); local dev is served at /
  ...(process.env.NODE_ENV === "production" && { basePath: "/projects/crosswit" }),
  // Next 16: Turbopack is default for dev + build. Use `next build --webpack` to opt out.
};

module.exports = nextConfig;
