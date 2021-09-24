import ioHook, {IOHookEvent} from 'electron-iohook';

ioHook.on('mousedown', (event: IOHookEvent) => {
  console.log(event);
});

ioHook.start();
