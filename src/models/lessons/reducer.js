import * as actionsTypes from './action-types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export const lessonsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.LOADING_LESSONS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.LOADING_LESSONS_FINISHED:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.data,
        error: '',
      };
    case actionsTypes.LOADING_LESSONS_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.ADDING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.ADDING_FINISHED:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.concat([action.payload.data]),
        error: '',
      };
    case actionsTypes.ADDING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.EDITING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.EDITING_FINISHED:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.map((lesson) => (lesson.id === action.payload.data.id
          ? action.payload.data
          : lesson)),
        error: '',
      };
    case actionsTypes.EDITING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
};
