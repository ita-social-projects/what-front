import { put, call, takeLatest, select } from 'redux-saga/effects';
import { creatingCourseFailed, creatingCourseSucceed, creatingCourseStarted, loadingCoursesFailed, loadingCoursesStarted, loadingCoursesSucceed, editingCourseStarted, editingCourseFailed, editingCourseSucceed } from './actions';
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
    const coursesData = yield call(fetchData);
    yield put(loadingCoursesSucceed(coursesData));
  } catch (error) {
    yield put(loadingCoursesFailed(error));
  }
}

function* createCourseWorker(data) {
  try {
    yield put(creatingCourseStarted());
    const course = yield call(createCourse, data.payload.course);
    yield put(creatingCourseSucceed(course));
  } catch (error) {
    yield put(creatingCourseFailed(error));
  }
}

function* editCourseWorker(data) {
  try {
    yield put(editingCourseStarted());
    const course = yield call(editCourse, data.payload.course, data.payload.id);
    const courses = yield select(coursesDataSelector);
    const updatedCourses = courses.map((item) => {
      if(item.id == course.id) {
        return course
      }
      return item;
    });
    yield put(editingCourseSucceed(updatedCourses))
  } catch (error) {
    yield put(editingCourseFailed(error));
  }
}

async function fetchData() {
  const response = await fetch('http://localhost:3000/api/courses');
  return await response.json();
}

async function createCourse(course) {
  const response = await fetch('http://localhost:3000/api/courses', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(course),
  })
  return await response.json();
}

async function editCourse(editedCourse, id) {
  const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(editedCourse)
  });
  return await response.json();
}