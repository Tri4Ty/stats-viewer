const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
const env = process.env.NODE_ENV;
 
const config = {
  entry: './src/index.js',
 
  output: {
    path: path.resolve(__dirname, 'umd'),
    library: 'StatsViewer',
    publicPath: '/',
  },
 
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
 
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.(scss|css)$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            }
          },
          'sass-loader',
        ],
      }
    ],
  },
 
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};
 
if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}
 
if (env === 'development') {
  config.mode = 'development';
  config.devtool = 'source-map';
}
 
if (env === 'production') {
  config.mode = 'production';
}
 
module.exports = config;