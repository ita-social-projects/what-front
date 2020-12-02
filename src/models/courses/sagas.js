import { all, fork, put, call, takeLatest, select } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import { coursesDataSelector } from './selectors';
import { FETCH_COURSES, LOADING_COURSES_STARTED, LOADING_COURSES_SUCCESS, LOADING_COURSES_FAILED,
  CREATE_COURSE, CREATING_COURSE_STARTED, CREATING_COURSE_SUCCESS, CREATING_COURSE_FAILED,
  EDIT_COURSE, EDITING_COURSE_STARTED, EDITING_COURSE_SUCCESS, EDITING_COURSE_FAILED
} from './types';

export const getCourses = () => {
  return {
    type: FETCH_COURSES,
  };
};

export const createCourse = (course) => {
  return {
    type: CREATE_COURSE,
    payload: {
      course,
    },
  };
};

export const editCourse = (course, id) => {
  return {
    type: EDIT_COURSE,
    payload: {
      course,
      id,
    },
  };
};

export function* loadCoursesWatcher() {
  yield takeLatest(FETCH_COURSES, loadCoursesWorker);
}

export function* createCourseWatcher() {
  yield takeLatest(CREATE_COURSE, createCourseWorker);
}

export function* editCourseWatcher() {
  yield takeLatest(EDIT_COURSE, editCourseWorker);
}

function* loadCoursesWorker() {
  try {
    yield put({type: LOADING_COURSES_STARTED});
    const courses = yield call(ApiService.load, '/courses');
    yield put({type: LOADING_COURSES_SUCCESS, payload: {courses,}});
  } catch (error) {
    yield put({type: LOADING_COURSES_FAILED, payload: {error: error.message}});
  }
}

function* createCourseWorker(data) {
  try {
    yield put({type: CREATING_COURSE_STARTED});
    const course = yield call(ApiService.create, '/courses', data.payload.course);
    yield put({type: CREATING_COURSE_SUCCESS, payload: {course,}});
  } catch (error) {
    yield put({type: CREATING_COURSE_FAILED, payload: {error: error.message}});
  }
}

function* editCourseWorker(data) {
  try {
    yield put({type: EDITING_COURSE_STARTED});
    const course = yield call(ApiService.update, `/courses/${data.payload.id}`, data.payload.course);
    const courses = yield select(coursesDataSelector);
    const updatedCourses = courses.map((item) => {
      if(item.id === course.id) {
        return course;
      }
      return item;
    });
    yield put({type: EDITING_COURSE_SUCCESS, payload: {courses: updatedCourses}});
  } catch (error) {
    yield put({type: EDITING_COURSE_FAILED, payload: {error: error.message}});
  }
}

export function* coursesWatcher() {
  yield all([
    fork(loadCoursesWatcher),
    fork(createCourseWatcher),
    fork(editCourseWatcher),
  ]);
}
