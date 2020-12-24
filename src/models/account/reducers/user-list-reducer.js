import * as actionTypes from '../types.js';

const initialState = {
  users: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export function usersListreducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_ASSIGNED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users: action.payload.usersList,
      };
    case actionTypes.FETCH_ASSIGNED_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionTypes.FETCH_UNASSIGNED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    default: return state;
  }
}
