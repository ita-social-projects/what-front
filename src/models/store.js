import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';
import { devtools } from './redux-devtools';

export const configureStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    devtools
  )
);
