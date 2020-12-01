import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import { creatingCourseFailed, creatingCourseSucceed, creatingCourseStarted, 
  loadingCoursesFailed, loadingCoursesStarted, loadingCoursesSucceed, 
  editingCourseStarted, editingCourseFailed, editingCourseSucceed, 
} from './actions/index.js';
import { coursesDataSelector } from './selectors';
import { CREATE_COURSE, EDIT_COURSE, GET_COURSES } from './types';

export function* loadCoursesWatcher() {
  yield takeLatest(GET_COURSES, loadCoursesWorker);
}

export function* createCourseWatcher() {
  yield takeLatest(CREATE_COURSE, createCourseWorker);
}

export function* editCourseWatcher() {
  yield takeLatest(EDIT_COURSE, editCourseWorker);
}

function* loadCoursesWorker() {
  try {
    yield put(loadingCoursesStarted());
    const courses = yield call(ApiService.load, '/courses');
    yield put(loadingCoursesSucceed(courses));
  } catch (error) {
    yield put(loadingCoursesFailed(error));
  }
}

function* createCourseWorker(data) {
  try {
    yield put(creatingCourseStarted());
    const course = yield call(ApiService.create, '/courses', data.payload.course);
    yield put(creatingCourseSucceed(course));
  } catch (error) {
    yield put(creatingCourseFailed(error));
  }
}

function* editCourseWorker(data) {
  try {
    yield put(editingCourseStarted());
    const course = yield call(ApiService.update, `/courses/${data.payload.id}`, data.payload.course);
    const courses = yield select(coursesDataSelector);
    const updatedCourses = courses.map((item) => {
      if(item.id === course.id) {
        return course;
      }
      return item;
    });
    yield put(editingCourseSucceed(updatedCourses));
  } catch (error) {
    yield put(editingCourseFailed(error));
  }
}

export function* coursesSaga() {
  yield all([
    fork(loadCoursesWatcher),
    fork(createCourseWatcher),
    fork(editCourseWatcher),
  ]);
}
