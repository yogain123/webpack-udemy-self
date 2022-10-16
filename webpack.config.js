const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    index22: "./src/index22.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          { loader: miniCssExtractPlugin.loader },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /.(png|jpg|jpeg|svg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ["index"],
      inject: true,
      filename: "index.html",
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index22.html"),
      chunks: ["index22"],
      inject: true,
      filename: "index22.html",
    }),
    new miniCssExtractPlugin(),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/**"),
          to: path.resolve(__dirname, "dist"),
          context: "src",
        },
      ],
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // note it - it generated src_index_css.js
    },
  },
};
