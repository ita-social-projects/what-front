import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';
import { Counter, EditGroup, FormExample, StudentProfile, Support } from './features/index.js';

import Icon from './icon.js';
import {EditLesson} from "./features/edit-lesson";
import {AddLesson} from "./features/add-lesson";
import { Tabs, Tab } from './components/index.js';

const store = configureStore();

export const App = () => (
  
  <Provider store={store}>
    {/*<h1>Hello, I`m App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} />
    <Icon icon="Edit" viewBox="0 0 50 50" />
    <Icon icon="Plus" size={32} className="icon" color="#FFFFFF" />
    <Icon icon="Plus" size={32} className="icon" color="#FFB800" />
    <Icon icon="Edit" viewBox="0 0 50 50" color="#FFB800" />*/}

    <Tabs defaultIndex={1} className='w-75 m-5'>                           
      <Tab title='Support'>
        <Support />
      </Tab>
      <Tab title='Edit Group'>
        <EditGroup />
      </Tab>
    </Tabs>

  </Provider>
);
