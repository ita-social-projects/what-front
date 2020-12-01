import * as actions from '../action-types.js';

export const deleteSecretary = (id) => ({
  type: actions.DELETE_SECRETARY,
  payload: { id },
});

export const secretaryDeletingStarted = () => ({
  type: actions.SECRETARY_DELETING_STARTED,
});

export const secretaryDeletingSuccess = (id) => ({
  type: actions.SECRETARY_DELETING_SUCCESS,
  payload: { id },
});

export const secretaryDeletingFailed = (error) => ({
  type: actions.SECRETARY_DELETING_FAILED,
  payload: { error },
});