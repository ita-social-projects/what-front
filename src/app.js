import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { configureStore } from './store.js';
import { Counter, NotFound } from './features/index.js';

import Icon from './icon.js';
import { EditLesson } from "./features/edit-lesson";
import { AddLesson } from "./features/add-lesson";
import { StudentScheduale } from './features/schedule-student/scheduale.js';


const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Router>
      <h1>Hello, I`m App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={32} />
      <Icon icon="Edit" viewBox="0 0 50 50" />
      <Icon icon="Plus" size={32} className="icon" color="#FFFFFF" />
      <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
      <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />

      <Switch>
        <Route exact path="/" render={() => (<h1>Home Page</h1>)} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);
