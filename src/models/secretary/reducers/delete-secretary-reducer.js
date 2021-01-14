import * as actions from '../action-types.js';

const initialState = {
  data: null,
  isLoading: false,
  loaded: false,
  error: '',
};

export const deleteSecretaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARY_DELETING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_DELETING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.secretaryId,
        erroe: '',
      };
    case actions.SECRETARY_DELETING_FAILED:
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
