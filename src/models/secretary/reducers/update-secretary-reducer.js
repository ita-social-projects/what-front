import * as actions from '../action-types.js';

const initialState = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const updateSecretaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARY_UPDATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_UPDATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.updatedData,
        error: '',
      };
    case actions.SECRETARY_UPDATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        loaded: false,
      };
    default: return state;
  }
};