module.exports = {
    stories: ['../stories/**/*.stories.js'],
    addons: [
      '@storybook/addon-actions', 
      '@storybook/addon-links'
    ],
    webpackFinal: async (config, { configType }) => {
      // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
      // You can change the configuration based on that.
      // 'PRODUCTION' is used when building the static version of storybook.
   
      // Make whatever fine-grained changes you need
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          'style-loader', 
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          'sass-loader'
        ],
      });
   
      // Return the altered config
      return config;
    },
  };