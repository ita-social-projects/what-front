import * as actionTypes from '../types.js';

const initialState = {
  notAsssigned: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export function unAssignedReducer(state = initialState, action) {
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
        notAsssigned: state.notAsssigned.concat([action.payload.regUser]),
      };

    case actionTypes.REGIST_ERROR:
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
        loaded: true,
        notAsssigned: state.notAsssigned.concat([action.payload.unAssigned]),
      };

    case actionTypes.FETCH_UNASSIGNED_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };

    default: return state;
  }
}
