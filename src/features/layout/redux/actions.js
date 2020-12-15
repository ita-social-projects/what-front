import * as actionTypes from './action-types.js';

export const showAlert = (message, variant = 'danger') => ({
  type: actionTypes.SHOW_ALERT,
  payload: {
    message,
    variant,
  },
});

export const hideAlert = () => ({
  type: actionTypes.HIDE_ALERT,
});
