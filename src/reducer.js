import { combineReducers } from 'redux';
import { counterReducer } from './features';

export const rootReducer = combineReducers({
    features: combineReducers({
        counter: counterReducer
    })
});
