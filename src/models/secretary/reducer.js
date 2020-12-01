import * as actions from './action-types.js';

const initialState = {
  secretaries: null,
  isLoading: false,
  loaded: false,
  error: '',
};

export const secretariesReducer = (state = initialState, action) => {
  switch (action.type) {
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
        secretaries: [...state.secretaries, action.payload.data],
        error: '',
      };
    case actions.SECRETARY_CREATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
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
        secretaries: action.payload.data,
        error: '',
      };
    case actions.SECRETARIES_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
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
        secretaries: action.payload.newData,
        // secretaries: state.secretaries.slice(0, action.payload.id)
        //   .concat(...action.payload.newData)
        //   .concat(state.secretaries.slice(action.payload.id + 1)),
        error: '',
      };
    case actions.SECRETARY_UPDATING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
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
        secretaries: state.filter((secretary) => secretary.id !== action.payload.id),
        erroe: '',
      };
    case actions.SECRETARY_DELETING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};