import { CREATE_COURSE, CREATING_COURSE_FAILED, 
  CREATING_COURSE_STARTED, CREATING_COURSE_SUCCESS 
} from "../types";

export const createCourse = (course) => {
  return {
    type: CREATE_COURSE,
    payload: {
      course,
    }
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