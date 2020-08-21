/*
 * @Author: Jhony Reyes
 * @Date: 2020-08-21 01:24:33
 * @Last Modified by:   Jhony Reyes
 * @Last Modified time: 2020-08-21 01:24:33
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import App from './App';
import store from './src/redux/store';
import {name as appName} from './app.json';

const AppWithSafeArea = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithSafeArea);
