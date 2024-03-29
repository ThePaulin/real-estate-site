/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/82c04vam/real-estate-site-properties/**",
      },
    ],
  },
};

module.exports = nextConfig;
