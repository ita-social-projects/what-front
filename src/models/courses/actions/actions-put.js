import { EDITING_COURSE_FAILED, EDITING_COURSE_STARTED, 
  EDITING_COURSE_SUCCESS, EDIT_COURSE 
} from "../types";

export const editCourse = (course, id) => {
  return {
    type: EDIT_COURSE,
    payload: {
      course,
      id,
    }
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
    },
  };
};