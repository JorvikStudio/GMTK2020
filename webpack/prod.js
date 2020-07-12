/* eslint-env node */
const merge = require("webpack-merge");
const base = require("./base");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src', to: 'dist' },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
});
