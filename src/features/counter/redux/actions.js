import * as actions from './action-types.js';

export const incrementCounter = () => ({
  type: actions.COUNTER_INCREMENT,
});

export const decrementCounter = () => ({
  type: actions.COUNTER_DECREMENT,
});
