import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import { themesDataSelector } from './selectors.js';
import { CREATE_THEME, DELETE_THEME, EDIT_THEME, GET_THEMES } from './types.js';
import { creatingThemeFailed, creatingThemeStarted, creatingThemeSucceed, 
  deletingThemeFailed, deletingThemeStarted, deletingThemeSucceed, 
  editingThemeFailed, editingThemeStarted, editingThemeSucceed, 
  loadingThemesFailed, loadingThemesStarted, loadingThemesSucceed 
} from './actions';

export function* loadThemesWatcher() {
  yield takeLatest(GET_THEMES, loadThemesWorker);
}

export function* createThemeWatcher() {
  yield takeLatest(CREATE_THEME, createThemeWorker);
}

export function* editThemeWatcher() {
  yield takeLatest(EDIT_THEME, editThemeWorker);
}

export function* deleteThemeWatcher() {
  yield takeLatest(DELETE_THEME, deleteThemeWorker);
}

function* loadThemesWorker() {
  try {
    yield put(loadingThemesStarted());
    const themes = yield call(ApiService.load, '/themes');
    yield put(loadingThemesSucceed(themes));
  } catch (error) {
    yield put(loadingThemesFailed(error));
  }
}

function* createThemeWorker(data) {
  try {
    yield put(creatingThemeStarted());
    const theme = yield call(ApiService.create, '/themes', data.payload.theme);
    yield put(creatingThemeSucceed(theme));
  } catch (error) {
    yield put(creatingThemeFailed(error));
  }
}

function* editThemeWorker(data) {
  try {
    yield put(editingThemeStarted());
    const theme = yield call(ApiService.update, `/themes/${data.payload.id}`, data.payload.theme);
    const themes = yield select(themesDataSelector);
    const updatedThemes = themes.map((item) => {
      if(item.id === theme.id) {
        return theme;
      }
      return item;
    });
    yield put(editingThemeSucceed(updatedThemes));
  } catch (error) {
    yield put(editingThemeFailed(error));
  }
}

function* deleteThemeWorker(data) {
  try {
    yield put(deletingThemeStarted());
    const theme = yield call(ApiService.remove, `/themes/${data.payload.id}`);
    const themes = yield select(themesDataSelector);
    const themeIndex = themes.findIndex((item) => item.id === theme.id);
    themes.splice(themeIndex, 1);
    yield put(deletingThemeSucceed(themes));
  } catch(error) {
    yield put(deletingThemeFailed(error));
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