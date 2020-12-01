import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from './action-types.js';
import { loadingStudentsStarted, loadingStudentsSucceed, loadingMentorsFailed } from './actions.js';

function* loadStudentsAsync() {
  try {
    yield put(loadingStudentsStarted());

    // will be replaced by API client method
    const response = yield call(axios.get, 'http://localhost:3000/api/students');

    yield put(loadingStudentsSucceed(response.data));
  } catch (error) {
    yield put(loadingMentorsFailed(error));
  }
}

export function* watchLoadingStudents() {
  yield takeLatest(actionTypes.LOAD_STUDENTS, loadStudentsAsync);
}
