import * as actions from './action-types.js';

const initialState = {
  searchSecretary: '',
};

export const listOfSecretariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_SEARCH_SECRETARY_VALUE:
      return {
        ...state,
        searchSecretary: action.payload.name,
      };
    default:
      return state;
  }
};