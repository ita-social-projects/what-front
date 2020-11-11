import React from 'react';
import { Provider } from 'react-redux';


import { configureStore } from './store';
import { Counter } from './features';
import Icon from './icon.js';
import { Tabs } from './components';

const store = configureStore();
const tabs = [
  {id: 1, title: 'Mentor`s details', active: false, link: 'students'},
  {id: 2, title: 'List of mentors', active: false, link: 'mentors'}
];

export const App = () => (
  
    <Provider store={store}>
      <h1>Hello, I'm App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={32} color="#f78259" /> 
      <Icon icon="Edit"/>
      <div className='nav nav-tabs w-50'>
        <Tabs props={tabs}/>
      </div>
    </Provider>
);
