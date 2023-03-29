module.exports = {
  reactStrictMode: true,
  // future: {
  //   webpack5: true,
  // },
  // webpack(config) {
  //   return config;
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
