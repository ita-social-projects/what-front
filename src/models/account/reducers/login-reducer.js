import { Cookie } from '@/utils/index.js';
import * as actionTypes from '../types.js';

const initialState = {
  currentUser: JSON.parse(Cookie.get('user') ?? null),
  isLoading: false,
  loaded: false,
  error: '',
};

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOGIN_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        currentUser: action.payload.logUser,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };
    default: return state;
  }
}