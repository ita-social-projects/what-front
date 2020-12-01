import { GET_COURSES, LOADING_COURSES_FAILED, LOADING_COURSES_STARTED, LOADING_COURSES_SUCCESS,
  CREATE_COURSE,
  CREATING_COURSE_STARTED,
  CREATING_COURSE_SUCCESS,
  CREATING_COURSE_FAILED,
  EDIT_COURSE,
  EDITING_COURSE_STARTED,
  EDITING_COURSE_SUCCESS,
  EDITING_COURSE_FAILED,
} from './types.js';

export const getCourses = () => {
  return {
    type: GET_COURSES,
  };
};

export const loadingCoursesStarted = () => {
  return {
    type: LOADING_COURSES_STARTED,
  };
};

export const loadingCoursesSucceed = (data) => {
  return {
    type: LOADING_COURSES_SUCCESS,
    payload: {
      data,
    }, 
  };
};

export const loadingCoursesFailed = (error) => {
  return {
    type: LOADING_COURSES_FAILED,
    payload: {
      error: error.message,
    },
  };
};

export const createCourse = () => {
  return {
    type: CREATE_COURSE,
  };
};

export const creatingCourseStarted = () => {
  return {
    type: CREATING_COURSE_STARTED,
  };
};

export const creatingCourseSucceed = (course) => {
  return {
    type: CREATING_COURSE_SUCCESS,
    payload: {
      course,
    },
  };
};

export const creatingCourseFailed = (error) => {
  return {
    type: CREATING_COURSE_FAILED,
    payload: {
      error: error.message,
    },
  };
};

export const editCourse = () => {
  return {
    type: EDIT_COURSE,
  };
};

export const editingCourseStarted = () => {
  return {
    type: EDITING_COURSE_STARTED,
  };
};

export const editingCourseSucceed = (courses) => {
  return {
    type: EDITING_COURSE_SUCCESS,
    payload: {
      courses,
    },
  };
};

export const editingCourseFailed = (error) => {
  return {
    type: EDITING_COURSE_FAILED,
    payload: {
      error: error.message,
    }
  }
}