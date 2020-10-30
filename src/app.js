import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './models/store';
import { TestFeature } from './features/test-feature';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I'm App Component!</h1>
    <TestFeature />
  </Provider>
);
