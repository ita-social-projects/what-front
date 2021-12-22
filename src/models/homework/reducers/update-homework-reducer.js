import * as actionTypes from '../types';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const updateHomeworkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATING_HOMEWORK_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.UPDATING_HOMEWORK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.homework,
        error: '',
      };
    case actionTypes.UPDATING_HOMEWORK_FAILED:
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
