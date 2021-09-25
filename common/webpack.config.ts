/* eslint-disable node/no-extraneous-import */
import {Configuration} from 'webpack';

const config: Configuration = {
  target: 'electron-main',
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
  },
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
