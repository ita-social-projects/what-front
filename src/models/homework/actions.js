import {
  put, call, takeLatest, fork, all, takeEvery
} from 'redux-saga/effects';

import { ApiService } from '@/shared';
import * as actionsTypes from './types.js';

export const fetchHomework = (id) => ({
  type: actionsTypes.FETCH_HOMEWORK_BY_ID,
  payload: { id },
});

export const addHomework = (data) => ({
  type: actionsTypes.ADD_HOMEWORK,
  payload: {
    data,
  },
});

export const editHomework = (data, id) => ({
  type: actionsTypes.EDIT_HOMEWORK,
  payload: {
    data,
    id,
  },
});

function* fetchHomeworkById({ payload }) {
  try{
    yield put({type: actionsTypes.LOADING_HOMEWORK_STARTED_BY_ID});

    const id = payload.id;
    const data = yield call(ApiService.load, )
}