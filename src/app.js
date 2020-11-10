import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import { Counter } from './features';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I&apos;m App Component!</h1>
    <Counter />
  </Provider>
);
