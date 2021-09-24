/* eslint-disable node/no-unpublished-import */
import ioHook, {IOHookEvent} from 'electron-iohook';
import {app} from 'electron';
import log from 'electron-log';

console.log(log.transports.file.getFile().path);

app.on('ready', () => {
  ioHook.on('mousedown', (event: IOHookEvent) => {
    log.info(event);
  });

  ioHook.start();
});

app.on('before-quit', () => {
  ioHook.unload();
  ioHook.stop();
});
