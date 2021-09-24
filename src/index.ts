/* eslint-disable node/no-unpublished-import */
import ioHook, {IOHookEvent} from 'electron-iohook';
import {app} from 'electron';

app.on('ready', () => {
  ioHook.on('mousedown', (event: IOHookEvent) => {
    console.log(event);
  });

  ioHook.start();
});

app.on('before-quit', () => {
  ioHook.unload();
  ioHook.stop();
});
