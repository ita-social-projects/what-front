import * as actionTypes from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export function unAssignedReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_UNASSIGNED_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.FETCH_UNASSIGNED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.unAssigned,
      };
    case actionTypes.FETCH_UNASSIGNED_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}
