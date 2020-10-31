import * as actions from './test-types';

export const addOne = () => (dispatch) => dispatch({
  type: actions.COUNTER_ADD_ONE
});

export const subtractOne = () => (dispatch) => dispatch({
  type: actions.COUNTER_SUBTRACT_ONE
});
