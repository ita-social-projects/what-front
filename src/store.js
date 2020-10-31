import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from './reducer';

export const configureStore = () => createStore(
    rootReducer,
    composeWithDevTools()
);
