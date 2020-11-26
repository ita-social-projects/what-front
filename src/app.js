import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store.js';
import {Counter, EditGroup, ListOfLessons, ListOfStudents, Routes} from './features/index.js';
import Icon from './icon.js';
import { ListOfMentors } from "@features/list-of-mentors";
import { EditMentor } from "@features/edit-mentor";
const store = configureStore();

export const App = () => (
  <Provider store={store}>
    
    <EditGroup />
    <EditMentor />
  </Provider>
);