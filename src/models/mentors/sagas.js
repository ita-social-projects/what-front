import { put, call, takeLatest } from 'redux-saga/effects';

import { ApiService } from '../../shared/index.js';
import * as actionTypes from './action-types.js';
import {
  loadingMentorsFailed,
  loadingMentorsStarted,
  loadingMentorsSucceed,
} from './actions.js';

function* fetchMentorsAsync() {
  try {
    yield put(loadingMentorsStarted());

    const mentorsData = yield call(ApiService.load, '/mentors');

    yield put(loadingMentorsSucceed(mentorsData));
  } catch (error) {
    yield put(loadingMentorsFailed(error));
  }
}

export function* loadMentorsWatcher() {
  yield takeLatest(actionTypes.LOAD_MENTORS, fetchMentorsAsync);
}
