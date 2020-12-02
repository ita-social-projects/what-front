import * as actionsTypes from './types.js'

const initialState = {
  data: null,
  groupSchedule: null,
  isLoading: false,
  loaded: false,
  error: '',
};

export function schedulesReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.LOADING_SCHEDULES_STARTED:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: '',
      };
    case actionsTypes.LOADING_SCHEDULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.schedules
      };
    case actionsTypes.LOADING_SCHEDULES_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.CREATING_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: '',
      };
    case actionsTypes.CREATING_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.concat([action.payload.schedule]),
      };
    case actionsTypes.CREATING_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.EDITING_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: '',
      };
    case actionsTypes.EDITING_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.map((schedule) => (schedule.id === action.payload.schedule.id
          ? action.payload.schedule : schedule)),
      };
    case actionsTypes.EDITING_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.DELETING_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: '',
      };
    case actionsTypes.DELETING_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.schedules,
      };
    case actionsTypes.DELETING_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionsTypes.LOADING_GROUP_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: '',
      };
    case actionsTypes.LOADING_GROUP_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        groupSchedule: action.payload.schedule
      };
    case actionsTypes.LOADING_GROUP_SCHEDULE_FAILED: 
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      }
    default: return state;
  }
}