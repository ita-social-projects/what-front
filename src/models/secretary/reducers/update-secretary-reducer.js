import * as actions from '../action-types.js';

const initialState = {
  data: {},
  isLoading: false,
  isLoaded: false,
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
        isLoaded: true,
        data: action.payload.updatedData,
        error: '',
      };
    case actions.SECRETARY_UPDATING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default: return state;
  }
};
