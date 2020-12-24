import * as actionTypes from '../types.js';

const initialState = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export function registReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGIST_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.REGIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.regUser,
      };
    case actionTypes.REGIST_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default: return state;
  }
}