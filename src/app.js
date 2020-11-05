import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from './store';
// eslint-disable-next-line import/extensions
import { Counter } from './features';
// import {TestInvoker} from './features/test-invoker';
// import { ModalWindow } from './components/modal-window/modal-window';

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <h1>Hello, I&apos;m App Component!</h1>
    <Counter />
    {/* <TestInvoker /> */}
  </Provider>
);
