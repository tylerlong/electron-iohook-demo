import {spawn} from 'child_process';
import fs from 'fs';
import path from 'path';

export const run = (command: string, ...args: readonly string[]) => {
  const childProcess = spawn(command, args, {stdio: 'inherit'});
  return new Promise<void>((resolve, reject) => {
    childProcess.once(
      'exit',
      (code: number | null, signal: NodeJS.Signals | null) => {
        if (code === 0) {
          resolve();
        } else {
          reject(signal);
        }
      }
    );
  });
};

export const appNames = fs
  .readdirSync(path.join(__dirname, '..', 'apps'))
  .filter(name => !name.startsWith('.'));

export const appPath = (app: string) => path.join(__dirname, '..', 'apps', app);
