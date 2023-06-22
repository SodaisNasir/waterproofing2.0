/**
 * @format
 */

//  import {AppRegistry} from 'react-native';
//  import App from './App';
//  import {name as appName} from './app.json';

//  AppRegistry.registerComponent(appName, () => App);
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { name as appName } from './app.json';
import store from './src/redux/store';
const Root = () => (
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => Root);
