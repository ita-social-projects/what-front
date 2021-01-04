import types from './action-types.js';

export const setSearchGroupValue = (groupName) => ({
  type: types.SET_SEARCH_VALUE,
  payload: {
    groupName,
  },
});

export const inputGroupStartDate = (groupDate) => ({
  type: types.SET_DATE,
  payload: {
    groupDate,
  },
});