import * as actions from './action-types.js';

export const incrementCounter = () => ({
  type: actions.COUNTER_INCREMENT,
});

export const decrementCounter = () => ({
  type: actions.COUNTER_DECREMENT,
});

export const fetchCounter = () => ({
  type: actions.FETCH_COUNTER,
});

export const counterFetchingStart = () => ({
  type: actions.COUNTER_LOADING_STARTED,
});

export const counterFetchingEnd = ({ counter }) => ({
  type: actions.COUNTER_LOADING_FINISHED,
  payload: {
    counter,
  },
});

export const counterFetchFailed = (error) => ({
  type: actions.COUNTER_LOADING_FAILED,
  payload: {
    error,
  },
});
