import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
import { Counter } from './features';
import { Card } from './components/card/card.js';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I'm App Component!</h1>
    <Counter />
    <Card data={{
        title:'Title',
        date:'11.15.20',
        button:'Details'
    }}>
        <p>Anastasia Gordienko</p>
    </Card>
  </Provider>
);
