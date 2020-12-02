import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import { themesDataSelector } from './selectors.js';
import { FETCH_THEMES, LOADING_THEMES_STARTED, LOADING_THEMES_SUCCESS, LOADING_THEMES_FAILED,
  CREATE_THEME, CREATING_THEME_STARTED, CREATING_THEME_SUCCESS, CREATING_THEME_FAILED, 
  EDIT_THEME, EDITING_THEME_STARTED, EDITING_THEME_SUCCESS, EDITING_THEME_FAILED,
  DELETE_THEME, DELETING_THEME_STARTED, DELETING_THEME_SUCCESS, DELETING_THEME_FAILED,     
} from './types.js';

export const getThemes = () => {
  return {
    type: FETCH_THEMES,
  };
};

export const createTheme = (theme) => {
  return {
    type: CREATE_THEME,
    payload: {
      theme,
    },
  };
};

export const editTheme = (theme, id) => {
  return {
    type: EDIT_THEME,
    payload: {
      theme,
      id,
    },
  };
};

export const deleteTheme = (id) => {
  return {
    type: DELETE_THEME,
    payload: {
      id,
    },
  };
};

export function* loadThemesWatcher() {
  yield takeLatest(FETCH_THEMES, loadThemesWorker);
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
    yield put({type: LOADING_THEMES_STARTED});
    const themes = yield call(ApiService.load, '/themes');
    yield put({type: LOADING_THEMES_SUCCESS, payload: {themes,}});
  } catch (error) {
    yield put({type: LOADING_THEMES_FAILED, payload: {error: error.message}});
  }
}

function* createThemeWorker(data) {
  try {
    yield put({type: CREATING_THEME_STARTED});
    const theme = yield call(ApiService.create, '/themes', data.payload.theme);
    yield put({type: CREATING_THEME_SUCCESS, payload: {theme,}})
  } catch (error) {
    yield put({type: CREATING_THEME_FAILED, payload: {error: error.message}})
  }
}

function* editThemeWorker(data) {
  try {
    yield put({type: EDITING_THEME_STARTED});
    const theme = yield call(ApiService.update, `/themes/${data.payload.id}`, data.payload.theme);
    const themes = yield select(themesDataSelector);
    const updatedThemes = themes.map((item) => {
      if(item.id === theme.id) {
        return theme;
      }
      return item;
    });
    yield put({type: EDITING_THEME_SUCCESS, payload: {themes: updatedThemes,}});
  } catch (error) {
    yield put({type: EDITING_THEME_FAILED, payload: {error: error.message}});
  }
}

function* deleteThemeWorker(data) {
  try {
    yield put({type: DELETING_THEME_STARTED});
    const theme = yield call(ApiService.remove, `/themes/${data.payload.id}`);
    const themes = yield select(themesDataSelector);
    const themeIndex = themes.findIndex((item) => item.id === theme.id);
    if (themeIndex > -1) {
      themes.splice(themeIndex, 1);
    }
    yield put({type: DELETING_THEME_SUCCESS, payload: {themes,}});
  } catch(error) {
    yield put({type: DELETING_THEME_FAILED, payload: {error: error.message}});
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

