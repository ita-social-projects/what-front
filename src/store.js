import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducer.js';

export const configureStore = () => createStore(
  rootReducer,
  composeWithDevTools(),
);
