import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';
const store = configureStore();

export const App = () => (
  <Provider store={store}>
  </Provider>
);