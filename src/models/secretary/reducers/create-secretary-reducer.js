import * as actions from '../action-types.js';

const initialState = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const createSecretaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARY_CREATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_CREATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.newSecretary,
        error: '',
      };
    case actions.SECRETARY_CREATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        loaded: false,
      };
    default: return state;
  }
};
