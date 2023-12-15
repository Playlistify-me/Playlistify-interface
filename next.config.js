/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["i.scdn.co"],
  },
};

module.exports = nextConfig;
