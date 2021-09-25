/* eslint-disable node/no-extraneous-import */
import {Configuration} from 'electron-builder';

const config: Configuration = {
  appId: 'electron-iohook-demo.chuntaoliu.com',
  productName: 'Electron iohook Demo',
  files: ['build/index.js'],
  mac: {
    category: 'public.app-category.developer-tools',
  },
  dmg: {
    contents: [
      {
        x: 128,
        y: 160,
      },
      {
        x: 384,
        y: 160,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  compression: 'maximum',
};

export default config;
