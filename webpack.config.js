const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => ({
  target: 'node',
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? false : 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: env.production ? true : false,
          configFile: '../tsconfig.json',
          onlyCompileBundledFiles: true,
        },
      },
    ],
  },
});
