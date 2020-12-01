import { GET_COURSES, LOADING_COURSES_FAILED, 
  LOADING_COURSES_STARTED, LOADING_COURSES_SUCCESS, 
} from '../types.js'

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