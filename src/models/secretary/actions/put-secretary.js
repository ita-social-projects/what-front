import * as actions from '../action-types.js';

export const updateSecretary = (id, newData) => ({
  type: actions.UPDATE_SECRETARY,
  payload: { id, newData },
});

export const secretaryUpdatingStarted = () => ({
  type: actions.SECRETARY_UPDATING_STARTED,
});

export const secretaryUpdatingSuccess = (id, newData) => ({
  type: actions.SECRETARY_UPDATING_SUCCESS,
  payload: { id, newData },
});

export const secretaryUpdatingFailed = (error) => ({
  type: actions.SECRETARY_UPDATING_FAILED,
  payload: { error },
});