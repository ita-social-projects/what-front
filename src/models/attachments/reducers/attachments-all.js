import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const attachmentsAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_ATTACHMENTS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.FETCHING_ATTACHMENTS_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };
      
    default:
      return state;
  }
};
