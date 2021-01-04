import * as actions from './action-types.js';

const INITIAL_STATE = {
  counter: 0,
  isLoading: false,
  error: '',
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
    case actions.COUNTER_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case actions.COUNTER_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
        counter: action.payload.counter,
      };
    case actions.COUNTER_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
