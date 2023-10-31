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
        hostname: "upload.wikimedia.org",
        port: "",
        pathname:
          "/wikipedia/commons/thumb/7/73/Tether_Logo.svg/2560px-Tether_Logo.svg.png",
      },
      {
        protocol: "https",
        hostname: "pngimg.com",
        port: "",
        pathname: "/d/bitcoin_PNG35.png",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname:
          "/wikipedia/commons/thumb/8/8f/QIWI_logo.svg/2560px-QIWI_logo.svg.png",
      },
    ],
  },
};

module.exports = nextConfig;
