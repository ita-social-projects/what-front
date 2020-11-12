import React from 'react';
import { Provider } from 'react-redux';


import { configureStore } from './store';
import { Counter } from './features';
import Icon from './icon.js';
import { Tabs } from './components';

const store = configureStore();
const tabs = [
  {id: 0, title: 'Mentor`s details', active: true, link: 'students'},
  {id: 1, title: 'List of mentors', active: false, link: 'mentors'},
  {id: 2, title: 'Schedule', active: false, link: 'schedule'},
];

const back = 'back'

export const App = () => (
  
    <Provider store={store}>
      {/*<h1>Hello, I'm App Component!</h1>
      <Counter />
      <Icon icon="Plus" size={32} color="#f78259" /> 
<Icon icon="Edit"/>*/}
      <div className='nav nav-tabs w-50'>
        <Tabs initialTabs={tabs} back={back}/>
      </div>
    </Provider>
);
