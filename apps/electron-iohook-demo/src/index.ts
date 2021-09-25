import ioHook, {IOHookEvent} from 'electron-iohook';
// eslint-disable-next-line node/no-extraneous-import
import {app} from 'electron';
import log from 'electron-log';

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
