import React from 'react';
import { Provider } from 'react-redux';


import { configureStore } from './store';
import { Counter } from './features';
import Icon from './icon.js';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
      <h1>Hello, I'm App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={100} color="#f78259" />
      <Icon icon="Edit"/>
      <Icon icon="DropDown" size={100} color="#f78259"/>
    </Provider>
);
