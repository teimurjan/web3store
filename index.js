global.process = {
  version: '0.0.0',
  umask: () => 18,
  cwd: () => '',
  nextTick: setImmediate,
  env: {},
};

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
