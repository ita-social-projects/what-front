import { CREATING_COURSE_FAILED, CREATING_COURSE_STARTED, CREATING_COURSE_SUCCESS, 
  EDITING_COURSE_FAILED, EDITING_COURSE_STARTED, EDITING_COURSE_SUCCESS, 
   LOADING_COURSES_FAILED, LOADING_COURSES_STARTED, LOADING_COURSES_SUCCESS, 
} from './types';

const initialState = {
  courses: null,
  isLoading: false,
  loaded: false,
  error: '',
};  

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_COURSES_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case LOADING_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        courses: action.payload.data,
        error: '',
      };
    case LOADING_COURSES_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
      case CREATING_COURSE_STARTED:
        return {
          ...state,
          isLoading: true,
          error: '',
        };
      case CREATING_COURSE_SUCCESS: 
        return {
          ...state,
          isLoading: false,
          loaded: true,
          courses: state.courses.concat([action.payload.course]),
          error: '',
        };
      case CREATING_COURSE_FAILED:
        return {
          ...state,
          isLoading: false,
          loaded: false,
          error: action.payload.error,
        };
      case EDITING_COURSE_STARTED:
        return {
          ...state,
          isLoading: true,
          error: '',
        };
      case EDITING_COURSE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          loaded: true,
          courses: action.payload.courses,
          error: '',
        };
      case EDITING_COURSE_FAILED:
        return {
          ...state,
          isLoading: false,
          loaded: false,
          error: action.payload.error,
        };
    default: return state;
  }
};