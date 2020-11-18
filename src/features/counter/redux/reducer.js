import * as actions from './action-types.js';

const INITIAL_STATE = {
  counter: 0,
};

export const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.COUNTER_INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case actions.COUNTER_DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};
