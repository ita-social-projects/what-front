import types from './action-types.js';

export const setSearchMentorValue = (mentorName) => ({
    type: types.SET_SEARCH_MENTOR_VALUE,
    payload: {
        mentorName,
    },
});
