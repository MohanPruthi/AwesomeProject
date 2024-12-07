/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './src/reducer';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer:rootReducer,
  });

const ReduxApp = () => (
<Provider store={store}>
    <App />
</Provider>
);


AppRegistry.registerComponent(appName, () => ReduxApp);
