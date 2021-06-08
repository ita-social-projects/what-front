import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import * as types from '@models/attachments/types';
import { ApiService } from '../../shared/api-service/index.js';

export const fetchAttachments = () => ({
  type: types.FETCH_ATTACHMENTS,
});

export const fetchAttachmentById = (id) => ({
  type: types.FETCH_ATTACHMENT_BY_ID,
  payload: { id },
});

export const createAttachments = (id) => ({
  type: types.CREATE_ATTACHMENTS,
  payload: { id },
});

export const deleteAttachment = (id) => ({
  type: types.DELETE_ATTACHMENT,
  payload: { id },
});

function* fetchAsyncAttachments() {
  try {
    yield put({ type: types.FETCHING_ATTACHMENTS_STARTED });
    const data = yield call(ApiService.load, '/attachments');
    yield put({ type: types.FETCHING_ATTACHMENTS_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_ATTACHMENTS_FAILED, payload: { error } });
  }
}

function* fetchAsyncAttachmentById({ payload }) {
  try {
    yield put({ type: types.FETCHING_ATTACHMENT_BY_ID_STARTED });
    const attachmentId = payload.id;
    const data = yield call(ApiService.load, `/attachments/${attachmentId}`);
    yield put({ type: types.FETCHING_ATTACHMENT_BY_ID_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_ATTACHMENT_BY_ID_FAILED, payload: { error } });
  }
}

function* createAsyncAttachments() {
  try {
    yield put({ type: types.CREATING_ATTACHMENTS_STARTED });
    const data = yield call(ApiService.create, '/attachments');
    yield put({ type: types.CREATING_ATTACHMENTS_SUCCEED, payload: { data } });
    yield put({ type: types.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: types.CREATING_ATTACHMENTS_FAILED, payload: { error } });
  }
}

function* deleteAsyncAttachment({ payload }) {
  try {
    yield put({ type: types.DELETING_ATTACHMENT_STARTED });
    const attachmentId = payload.id;
    const data = yield call(ApiService.remove, `/attachments​/${attachmentId}`);
    yield put({ type: types.DELETING_ATTACHMENT_SUCCESS, payload: { data } });
  } catch (error) {
    yield put({ type: types.DELETING_ATTACHMENT_FAILED, payload: { error } });
  }
}

function* fetchingAttachmentsWatcher() {
  yield takeLatest(types.FETCH_ATTACHMENTS, fetchAsyncAttachments);
}

function* fetchingAttachmentByIdWatcher() {
  yield takeLatest(types.FETCH_ATTACHMENT_BY_ID, fetchAsyncAttachmentById);
}

function* creatingAttachmentsWatcher() {
  yield takeEvery(types.CREATE_ATTACHMENTS, createAsyncAttachments);
}

function* deletingAttachmentsWatcher() {
  yield takeEvery(types.DELETE_ATTACHMENT, deleteAsyncAttachment);
}

export function* attachmentsWatcher() {
  yield all([
    fork(fetchingAttachmentsWatcher),
    fork(fetchingAttachmentByIdWatcher),
    fork(creatingAttachmentsWatcher),
    fork(deletingAttachmentsWatcher)
  ]);
}