/* eslint-disable node/no-extraneous-import */
import {Configuration} from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
  target: 'electron-main',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'build'),
  },
  externals: [nodeExternals() as any],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
};

export default config;
