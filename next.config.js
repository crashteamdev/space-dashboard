/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  output: "standalone",
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alllogos.ru",
        port: "",
        pathname: "/images/logotip-free-kassa.png",
      },
      {
        protocol: "https",
        hostname: "marketing.uz",
        port: "",
        pathname:
          "/uploads/articles/1222/article-original.png",
      },
    ],
  },
};

module.exports = nextConfig;
