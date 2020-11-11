import React from 'react';
import { Provider } from 'react-redux';


import { configureStore } from './store';
import { Counter } from './features';
import Icon from './icon.js';
import {AddLesson} from "./features/add-lesson";

const store = configureStore();

export const App = () => (
    <Provider store={store}>
      <h1 pt={5}>Hello, I'm App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={32} color="#f78259" />
      <Icon icon="Edit"/>
      <AddLesson />
    </Provider>
);
