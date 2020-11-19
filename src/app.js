import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';
import { Counter } from './features/index.js';

import Icon from './icon.js';
import {EditLesson} from "./features/edit-lesson";
import {AddLesson} from "./features/add-lesson";
import { StudentScheduale } from './features/schedule-student/scheduale.js';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I`m App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
    <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />
    <Icon icon="Back" color="#FFB800" />
    <Icon icon="Calendar" color="#FFB800" />
    <Icon icon="CheckboxFalse" color="#FFB800" />
    <Icon icon="CheckboxNull" color="#FFB800" />
    <Icon icon="CheckboxTrue" color="#FFB800" />
    <Icon icon="CheckFalse" color="#FFB800" />
    <Icon icon="CheckNull" color="#FFB800" />
    <Icon icon="CheckTrue" color="#FFB800" />
    <Icon icon="CloseButton" color="#FFB800" />
    <Icon icon="DropDown" color="#FFB800" />
    <Icon icon="DropDownButton" viewBox="0 0 50 50" color="#FFB800" />
    <Icon icon="LogOut" viewBox="0 0 50 50" size={100} />
    <Icon icon="Menu" viewBox="0 0 50 50" size={100} color="#FFB800" />
    <Icon icon="Profile" viewBox="0 0 50 50" size={100} color="#FFB800" />
    <Icon icon="Search" viewBox="0 0 50 50" size={100} color="#FFB800" />
  </Provider>
);
