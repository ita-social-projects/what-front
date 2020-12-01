import * as actions from '../action-types.js';

export const createSecretary = () => ({
  type: actions.CREATE_SECRETARY,
});

export const secretaryCreatingStarted = (data) => ({
  type: actions.SECRETARY_CREATING_STARTED,
  payload: { data },
});

export const secretaryCreatingSuccess = (data) => ({
  type: actions.SECRETARY_CREATING_SUCCESS,
  payload: { data },
});

export const secretaryCreatingFailed = (error) => ({
  type: actions.SECRETARY_CREATING_FAILED,
  payload: { error },
});