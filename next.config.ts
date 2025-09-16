export default {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https'
  //     },
  //   ],
  // },

  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader"
    });
    return config;
  }
};
