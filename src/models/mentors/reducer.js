import * as actionsTypes from './action-types.js';

const INITIAL_STATE = {
  mentors: null,
  isLoading: false,
  loaded: false,
  error: '',
};

export const mentorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.LOADING_MENTORS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case actionsTypes.LOADING_MENTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        mentors: action.payload.data,
        error: '',
      };

    case actionsTypes.LOADING_MENTORS_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
