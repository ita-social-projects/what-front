import types from './action-types.js';

const INITIAL_STATE = {
    searchStudentValue: '',
};

export const listOfStudentsReducer = (state = INITIAL_STATE, action) => {
    if(action.type === types.SET_SEARCH_STUDENT_VALUE) {
        return {
            ...state,
            searchStudentValue: action.payload.studentName,
            }
        }
        else {
            return state;
    }
};