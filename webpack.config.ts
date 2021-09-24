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
        test: /\/macOS\/.*\.node$/,
        loader: 'node-loader',
        options: {
          name: 'macOS/[name].[ext]',
        },
      },
      {
        test: /\/windows\/.*\.node$/,
        loader: 'node-loader',
        options: {
          name: 'windows/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '**/macOS/*.dylib',
          to: 'macOS/[name][ext]',
        },
        {
          from: '**/windows/*.dll',
          to: 'windows/[name][ext]',
        },
      ],
    }),
  ],
  watchOptions: {
    ignored: ['**/dist/**'],
  },
};

export default config;
