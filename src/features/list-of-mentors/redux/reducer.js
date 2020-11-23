import types from './action-types.js';

const INITIAL_STATE = {
    searchMentorValue: '',
};

export const listOfMentorsReducer = (state = INITIAL_STATE, action) => {
    if(action.type === types.SET_SEARCH_MENTOR_VALUE) {
        return {
            ...state,
            searchMentorValue: action.payload.mentorName,
            }
        }
        else {
            return state;
    }
};