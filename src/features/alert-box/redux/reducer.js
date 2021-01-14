import * as actionTypes from './action-types.js';

const INITIAL_STATE = {
  messages: [],
};

export const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SHOW_ALERT:
      return {
        ...state,
        messages: [...state.messages, { ...action.payload }],
      };

    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.payload.id),
      };

    default:
      return state;
  }
};
