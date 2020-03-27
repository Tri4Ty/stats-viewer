// for Hot Module Replacement
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 
const config = {
  mode: 'development',
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          },
          'eslint-loader'
        ]
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
    ]
  },
  plugins: [
    // use HtmlWebpackPlugin to auto generate the index.html file
    // based on a template (index_template)
    new HtmlWebpackPlugin({
      title: "Stats Viewer Demo",
      template: "./src/index_template.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: "none",
    // Enable gzip compression of generated files.
    compress: true,
    // where to pull the source from
    contentBase: "./src",
    // enable hot module replacement
    hot: true,
    // launch a browser by default on start up
    open: true
  }
};
 
module.exports = config;