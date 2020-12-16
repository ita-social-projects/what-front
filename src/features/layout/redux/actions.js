import { delay, takeEvery, put } from 'redux-saga/effects';

import * as actionTypes from './action-types.js';

export const addAlert = (message, variant = 'danger', delayTime = 10000) => ({
  type: actionTypes.ADD_ALERT,
  payload: {
    message,
    variant,
    delayTime,
  },
});

export const removeAlert = (id) => ({
  type: actionTypes.REMOVE_ALERT,
  payload: { id },
});

function* addAlertAsync({ payload }) {
  const { message, variant, delayTime } = payload;
  const id = Date.now();

  yield put({
    type: actionTypes.SHOW_ALERT,
    payload: {
      id,
      message,
      variant,
    },
  });

  yield delay(delayTime);

  yield put(removeAlert(id));
}

export function* watchAddAlert() {
  yield takeEvery(actionTypes.ADD_ALERT, addAlertAsync);
}
