/* eslint-disable node/no-unpublished-import */
import {Configuration} from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

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
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: '**/uiohook.dylib', to: '[name][ext]'},
        {from: '**/uiohook.dll', to: '[name][ext]'},
      ],
    }),
  ],
};

export default config;
