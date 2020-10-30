import { testActionTypes } from './test-types';

const INITIAL_STATE = {
  counter: 0
};

export const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case testActionTypes.ADD_ONE:
      return {
        ...state,
        counter: ++state.counter
      };
    case testActionTypes.SUBTRACT_ONE:
      return {
        ...state,
        counter: --state.counter
      };
    default:
      return state;
  }
};
