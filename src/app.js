import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store.js';
import { Counter, Routes } from './features/index.js';
import Icon from './icon.js';


const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);