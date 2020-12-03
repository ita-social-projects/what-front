import { put, call, takeLatest, all, fork, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './types.js'

import { ApiService } from '../api-service';
import { Cookie } from '@/utils/index.js';

export const login = (currentUser) => {
    return{
      type: actionTypes.LOGIN_REQUESTING,
      payload: {
        currentUser,
      },
    }
}

export const registretion = (newUser) => {
  return{
      type: actionTypes.REGIST_REQUSTING,
      payload: {
        newUser,
      },
  }
}

export const fetchUsersList = () => {
  return{
    type: actionTypes.FETCH_ASSIGNED
  }
}

export const fetchUnAssignedUserList = () => {
  return{
    type: actionTypes.FETCH_UNASSIGNED
  }
}

export const logOut = () => {
  return{
    type: actionTypes.LOGOUT
  }
}

function* loginWtacher() {
  yield takeLatest(actionTypes.LOGIN_REQUESTING, logingWorker);
}

function* logOutWatcher(){
  yield takeEvery(actionTypes.LOGOUT, logOutWorker)
}

function* registretionWather() {
  yield takeLatest(actionTypes.REGIST_REQUSTING, registretionWorker);
}

function* fetchAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_ASSIGNED, getAssigenUsersWorker);
}
function* fetchUnAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_UNASSIGNED, getUnAssigenUsersWorker);
}


function* logingWorker(data) {
  try {
    yield put({type: actionTypes.LOGIN_STARTED});
    const logUser = yield call(ApiService.create, '/accounts/auth', data.payload.currentUser);
    yield call( Cookie.set, 'user', JSON.stringify(logUser), 1 );
    yield put({type: actionTypes.LOGIN_SUCCESS, payload: {logUser}});
   
  } catch (error) {
    yield put({type: actionTypes.LOGIN_ERROR, payload: {error: error.message}});
  }
}

function* logOutWorker() {
  yield call(Cookie.del, 'user');
  yield call(Cookie.del, 'jwt');
  yield put({type: actionTypes.CLEAR_USER});
}

function* registretionWorker(data) {
  try {
    yield put({type: actionTypes.REGIST_STARTED});
    const regUser = yield call(ApiService.create, '/accounts/reg', data.payload.newUser);
    yield put({type: actionTypes.REGIST_SUCCESS, payload: {regUser}});
   
  } catch (error) {
    yield put({type: actionTypes.REGIST_ERROR, payload: {error: error.message}});
  }
}

function* getAssigenUsersWorker() {
  try {
    yield put({type: actionTypes.FETCH_ASSIGNED_STARTED});
    const usersList = yield call(ApiService.load, '/accounts');
    yield put({type: actionTypes.FETCH_ASSIGNED_SUCCESS, payload: {usersList,}});
 
  } catch (error) {
    yield put({type: actionTypes.FETCH_ASSIGNED_ERROR, payload: {error: error.message}});
  }
}

function* getUnAssigenUsersWorker() {
  try {
    yield put({type: actionTypes.FETCH_UNASSIGNED_STARTED});
    const unAssigned = yield call(ApiService.load, '/accounts/NotAssigned');
    yield put({type: actionTypes.FETCH_UNASSIGNED_SUCCESS, payload: {unAssigned,}});
 
  } catch (error) {
    yield put({type: actionTypes.FETCH_UNASSIGNED_ERROR, payload: {error: error.message}});
  }
}

export function* authWatcher() {
  yield all([
    fork(loginWtacher),
    fork(logOutWatcher),
    fork(registretionWather),
    fork(fetchAssignedUserListWatcher),
    fork(fetchUnAssignedUserListWatcher),
  ])
}
