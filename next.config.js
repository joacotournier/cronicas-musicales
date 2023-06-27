/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/app/image.js",
  },
};

module.exports = nextConfig;
