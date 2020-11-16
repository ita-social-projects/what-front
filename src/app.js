import React from 'react';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/extensions
import { configureStore } from './store';
// eslint-disable-next-line import/extensions
import { Counter } from './features';
import Icon from './icon.js';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I`m App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} />
    <Icon icon="Edit" viewBox="0 0 50 50" />
    <Icon icon="Plus" size={32} className="icon" color="#FFFFFF" />
    <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
    <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />
  </Provider>
);
