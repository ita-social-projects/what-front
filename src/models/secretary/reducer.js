import * as actions from './action-types.js';

const initialState = {
  data: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export const secretariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARIES_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARIES_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.secretaries,
        error: '',
      };
    case actions.SECRETARIES_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    case actions.SECRETARY_CREATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_CREATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: [...state.data, action.payload.newSecretary],
        error: '',
      };
    case actions.SECRETARY_CREATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    case actions.SECRETARY_UPDATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_UPDATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.map((secretary) => (
          secretary.id === action.payload.updatedData.id ? action.payload.updatedData : secretary
        )),
        error: '',
      };
    case actions.SECRETARY_UPDATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    case actions.SECRETARY_DELETING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_DELETING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: state.data.filter((secretary) => secretary.id !== action.payload.secretaryId),
        erroe: '',
      };
    case actions.SECRETARY_DELETING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    default:
      return state;
  }
};