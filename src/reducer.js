import { combineReducers } from 'redux';
import { counterReducer, listOfStudentsReducer } from './features';

export const rootReducer = combineReducers({
    features: combineReducers({
        counter: counterReducer,
        listOfStudents: listOfStudentsReducer,
    })
});
