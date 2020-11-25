import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store.js';
import { Counter, Routes } from './features/index.js';
import Icon from './icon.js';
import {AddLesson} from "@features/add-lesson";
import {EditLesson} from "@features/edit-lesson";

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Router>
      <h1>Hello, I`m App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
      <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />
      <Routes />
      <AddLesson />
      <EditLesson />
    </Router>
  </Provider>
);