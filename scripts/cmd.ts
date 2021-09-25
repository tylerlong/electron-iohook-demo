/* eslint-disable node/no-unpublished-import */
import {build, Platform, DIR_TARGET} from 'electron-builder';

import config from './electron-builder';

build({
  config: {...config, mac: {...config.mac, identity: null}}, // config.mac.identity = null to disable code signing
  targets: Platform.MAC.createTarget(DIR_TARGET),
});
