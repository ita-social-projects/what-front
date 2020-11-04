import React from 'react';
import { Provider } from 'react-redux';


import { configureStore } from './store';
import { Counter } from './features';
//import Icon from './icon.js';
import Cat from './svg/cat.svg';

const store = configureStore();

export const App = () => (
    <Provider store={store}>
      <h1>Hello, I'm App Component!</h1>
      <Counter />
      <div>
        <Cat />
      </div>
    </Provider>
);
