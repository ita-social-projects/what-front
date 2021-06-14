import * as types from '../types.js';

const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  error: '',
}; 

export const attachmentDeleteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DELETING_ATTACHMENT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case types.DELETING_ATTACHMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
    case types.DELETING_ATTACHMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
};
