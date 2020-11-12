import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store.js';
import { Counter } from './features/index.js';
import Icon from './icon.js';
import { Card } from './components/card/index.js';

const store = configureStore();

const handleClick = (id) => {
  console.log(`card with id ${id} was clicked`);
};

const handleEdit = (id) => {
  console.log(`card with id ${id} will be edited`);
};

const handleDetails = (id) => {
  console.log(`details for card with id ${id}`);
};

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I`m App Component!</h1>
    <Counter />
    <Icon icon="Plus" size={32} color="#f78259" />
    <Icon icon="Edit" />
    <Card
        title='Title'
      date="15.15.15"
      onClick={handleClick}
      onEdit={handleEdit}
      onDetails={handleDetails}
      buttonName="save"
      iconName="Edit"
    >
      <p>SomeText</p>
    </Card>
  </Provider>
);
