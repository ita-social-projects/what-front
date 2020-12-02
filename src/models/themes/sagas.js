import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import * as actionTypes from './types.js';

export const getThemes = () => {
  return {
    type: actionTypes.FETCH_THEMES,
  };
};

export const createTheme = (theme) => {
  return {
    type: actionTypes.CREATE_THEME,
    payload: {
      theme,
    },
  };
};

export const editTheme = (theme, id) => {
  return {
    type: actionTypes.EDIT_THEME,
    payload: {
      theme,
      id,
    },
  };
};

export const deleteTheme = (id) => {
  return {
    type: actionTypes.DELETE_THEME,
    payload: {
      id,
    },
  };
};

export function* loadThemesWatcher() {
  yield takeLatest(actionTypes.FETCH_THEMES, loadThemesWorker);
}

export function* createThemeWatcher() {
  yield takeLatest(actionTypes.CREATE_THEME, createThemeWorker);
}

export function* editThemeWatcher() {
  yield takeLatest(actionTypes.EDIT_THEME, editThemeWorker);
}

export function* deleteThemeWatcher() {
  yield takeLatest(actionTypes.DELETE_THEME, deleteThemeWorker);
}

function* loadThemesWorker() {
  try {
    yield put({type: actionTypes.LOADING_THEMES_STARTED});
    const themes = yield call(ApiService.load, '/themes');
    yield put({type: actionTypes.LOADING_THEMES_SUCCESS, payload: {themes,}});
  } catch (error) {
    yield put({type: actionTypes.LOADING_THEMES_FAILED, payload: {error: error.message}});
  }
}

function* createThemeWorker(data) {
  try {
    yield put({type: actionTypes.CREATING_THEME_STARTED});
    const theme = yield call(ApiService.create, '/themes', data.payload.theme);
    yield put({type: actionTypes.CREATING_THEME_SUCCESS, payload: {theme,}})
  } catch (error) {
    yield put({type: actionTypes.CREATING_THEME_FAILED, payload: {error: error.message}})
  }
}

function* editThemeWorker(data) {
  try {
    yield put({type: actionTypes.EDITING_THEME_STARTED});
    const theme = yield call(ApiService.update, `/themes/${data.payload.id}`, data.payload.theme);
    yield put({type: actionTypes.EDITING_THEME_SUCCESS, payload: {theme}});
  } catch (error) {
    yield put({type: actionTypes.EDITING_THEME_FAILED, payload: {error: error.message}});
  }
}

function* deleteThemeWorker(data) {
  try {
    yield put({type: actionTypes.DELETING_THEME_STARTED});
    const theme = yield call(ApiService.remove, `/themes/${data.payload.id}`);
    yield put({type: actionTypes.DELETING_THEME_SUCCESS, payload: {theme}});
  } catch(error) {
    yield put({type: actionTypes.DELETING_THEME_FAILED, payload: {error: error.message}});
  } 
}

export function* themesWatcher() {
  yield all([
    fork(loadThemesWatcher),
    fork(createThemeWatcher),
    fork(editThemeWatcher),
    fork(deleteThemeWatcher),
  ])
}

