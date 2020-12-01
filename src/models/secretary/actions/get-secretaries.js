import * as actions from '../action-types.js';

export const getSecretaries = () => ({
  type: actions.GET_SECRETARIES,
});

export const secretariesLoadingStarted = () => ({
  type: actions.SECRETARIES_LOADING_STARTED,
});

export const secretariesLoadingSuccess = (data) => ({
  type: actions.SECRETARIES_LOADING_SUCCESS,
  payload: { data },
});

export const secretariesLoadingFailed = (error) => ({
  type: actions.SECRETARIES_LOADING_FAILED,
  payload: { error },
});