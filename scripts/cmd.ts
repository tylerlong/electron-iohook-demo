/* eslint-disable node/no-unpublished-import */
// import {build, Platform, DIR_TARGET} from 'electron-builder';
import inquirer from 'inquirer';
import {Command} from 'commander';
import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

import {yarn, appNames} from './utils';
// import config from '../common/electron-builder';
import webpackConfig from '../common/webpack.config';

const commands = ['build', 'start', 'release', 'prepare', 'test'];

// build({
//   config: {...config, mac: {...config.mac, identity: null}}, // config.mac.identity = null to disable code signing
//   targets: Platform.MAC.createTarget(DIR_TARGET),
// });

const build = async (app: string) => {
  const appDir = path.join(__dirname, '..', 'apps', app);
  webpackConfig.context = appDir;
  webpackConfig.mode = 'development';
  webpackConfig.externals = [
    nodeExternals({modulesDir: path.join(appDir, 'node_modules')}),
  ];
  webpackConfig.output = {
    path: path.join(appDir, 'build'),
  };
  webpack(webpackConfig, (err, stats) => {
    if (err !== null) {
      throw err;
    }
    const errors = stats?.toJson().errors;
    if (errors?.length === 0) {
      console.log('Successfully built', app);
    } else {
      console.log(errors);
    }
  });
};

const start = async (app: string) => {
  console.log('start', app);
  await yarn('lerna', 'exec', 'electron .', `--scope=${app}`);
};

const runCommand = async (app: string, command: string) => {
  switch (command) {
    case 'build': {
      await build(app);
      break;
    }
    case 'start': {
      await start(app);
      break;
    }
    case 'release': {
      break;
    }
    case 'prepare': {
      break;
    }
    case 'test': {
      break;
    }
    default: {
      throw new Error(`Unknown command, ${command}`);
    }
  }
};

// parse command args
const program = new Command();
program
  .option('-a --app <app>', 'app to manage')
  .option('-c --command <command>', 'command to run');
program.parse(process.argv);
let {app, command} = program.opts();
if (app && app.length > 2) {
  app = appNames.find(item => item.includes(app));
}
if (command && command.length > 2) {
  command = commands.find(item => item.includes(command));
}

// prompt for missing args
(async () => {
  if (!app) {
    app = (
      await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'app',
          message: 'Which app do you want to manage?',
          choices: appNames,
        },
      ])
    ).app;
  }
  if (!command) {
    command = (
      await inquirer.prompt([
        {
          type: 'rawlist',
          name: 'command',
          message: 'Which command do you want to run?',
          choices: commands,
        },
      ])
    ).command;
  }

  // run the command
  await runCommand(app, command);
})();
