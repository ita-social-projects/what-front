import types from './action-types.js';

const INITIAL_STATE = {
  searchGroup: '',
  groupStartDate: '',
};

export const listOfGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_SEARCH_VALUE:
      return {
        ...state,
        searchGroup: action.payload.groupName,
      };
    case types.SET_DATE:
      return {
        ...state,
        groupStartDate: action.payload.groupDate,
      };
    default:
      return state;
  }
};
