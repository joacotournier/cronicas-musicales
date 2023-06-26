/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === "production" ? "/lauro-ayestaran" : "",
  basePath: process.env.NODE_ENV === "production" ? "/lauro-ayestaran" : "",
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/app/image.js",
  },
};

module.exports = nextConfig;
