const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsNameof = require('ts-nameof');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  optimization: {
    minimize: false
  },
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({before: [tsNameof]})
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      //onBuildEnd: ['yarn run:dev']
    })
  ],
}

