/* eslint-disable node/no-unpublished-import */
import {Configuration} from 'webpack';

const config: Configuration = {
  target: 'electron-main',
  entry: {
    index: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
};

export default config;
