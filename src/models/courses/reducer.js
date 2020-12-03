import * as actionTypes from './types';

const initialState = {
  data: [],
  isLoading: false,
  loaded: false,
  error: '',
};  

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_COURSES_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOADING_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.courses,
        error: '',
      };
    case actionTypes.LOADING_COURSES_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
      case actionTypes.CREATING_COURSE_STARTED:
        return {
          ...state,
          isLoading: true,
          error: '',
        };
      case actionTypes.CREATING_COURSE_SUCCESS: 
        return {
          ...state,
          isLoading: false,
          loaded: true,
          data: state.data.concat([action.payload.course]),
          error: '',
        };
      case actionTypes.CREATING_COURSE_FAILED:
        return {
          ...state,
          isLoading: false,
          loaded: false,
          error: action.payload.error,
        };
      case actionTypes.EDITING_COURSE_STARTED:
        return {
          ...state,
          isLoading: true,
          error: '',
        };
      case actionTypes.EDITING_COURSE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          loaded: true,
          data: state.data.map((course) => (course.id === action.payload.course.id
            ? action.payload.course : course)),
          error: '',
        };
      case actionTypes.EDITING_COURSE_FAILED:
        return {
          ...state,
          isLoading: false,
          loaded: false,
          error: action.payload.error,
        };
    default: return state;
  }
};