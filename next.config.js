/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: false,
  },
  images: {
    domains: ["localhost", "images2.imgbox.com"],
  },
};

module.exports = nextConfig;
