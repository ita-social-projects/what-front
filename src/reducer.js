import { combineReducers } from 'redux';
import { counterReducer, listOfStudentsReducer, listOfCoursesReducer } from './features';

export const rootReducer = combineReducers({
    features: combineReducers({
        counter: counterReducer,
        listOfStudents: listOfStudentsReducer,
        listOfCourses: listOfCoursesReducer,
    })
});
