import * as actionTypes from './action-types.js';

const INITIAL_STATE = {
  isVisible: false,
  messages: '',
  variant: '',
};

export const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        isVisible: true,
        message: action.payload.message,
        variant: action.payload.variant,
      };

    case actionTypes.HIDE_ALERT:
      return {
        ...state,
        isVisible: false,
        message: '',
      };

    default:
      return state;
  }
};
