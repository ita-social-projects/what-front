import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import { Counter } from './features';
import { Card } from './components';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I'm App Component!</h1>
    <Counter />
    <Card data={{
        title: 'Title',
        button:'Details',
        date:'15.10.20'
    }}/>
  </Provider>
);
