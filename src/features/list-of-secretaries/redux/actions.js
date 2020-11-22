import * as actions from './action-types.js';

export const setSerchSecretaryValue = (name) => ({
  type: actions.SET_SEARCH_SECRETARY_VALUE,
  payload: {
    name,
  },
});