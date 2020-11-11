import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store.js';
import { Counter } from './features/index.js';
import Icon from './icon.js';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I'm App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} color="#f78259" />
    <Icon icon="Edit" />
  </Provider>
);
