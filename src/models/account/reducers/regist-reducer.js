import * as actionTypes from '../types.js';

const initialState = {
  notAssigned: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export function registReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGIST_REQUSTING:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

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
        loaded: true,
        notAssigned: state.notAssigned.concat([action.payload.regUser]),
      };
    case actionTypes.REGIST_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}