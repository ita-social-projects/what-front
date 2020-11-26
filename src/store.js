import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer.js';
import { rootSaga } from './root-saga.js';

const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
