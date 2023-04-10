/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");

const isDev = process.env.NODE_ENV !== "production";
const withPWA = require("next-pwa")({
  dest: "public",
  disable: isDev,
  exclude: [
    ({ asset, compilation }) => {
      if (
        asset.name.startsWith("server/") ||
        asset.name.match("manifest.json")
      ) {
        return true;
      }
      if (isDev && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    },
  ],
});

const navigatiors = [
  {
    source: "/oauth2/google",
    destination: "/login/oauth2/google-redirect",
  },
  {
    source: "/oauth2/kakao",
    destination: "/login/oauth2/kakao-redirect",
  },
  {
    source: "/oauth2/naver",
    destination: "/login/oauth2/naver-redirect",
  },
];

const endpoints = [
  {
    source: "/api/session/user",
    destination: "/api/cookie/iron-session-user",
  },
];

const nextConfig = {
  experimental: { appDir: true },
  reactStrictMode: true,
  // async redirects() {
  //   return [];
  // },
  async rewrites() {
    return [...navigatiors, ...endpoints];
  },
};

module.exports = withPlugins([withPWA(nextConfig)]);
