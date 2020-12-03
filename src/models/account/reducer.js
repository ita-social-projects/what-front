import { Cookie } from '@/utils/index.js';
import * as actionTypes from './types.js'

const initialState = {
  users: [],
  notAsssigned:[],
  currentUser: JSON.parse(Cookie.get('user')?? null),
  isLogged: false,
  isLoading: false,
  loaded: false,
  error: '',
};

export function authReducer(state=initialState, action){
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOGIN_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOGIN_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      loaded: true,
      currentUser: action.payload.logUser,
    };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };


    case actionTypes.REGIST_REQUSTING:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case actionTypes.REGIST_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
      
    case actionTypes.REGIST_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users:   state.users.concat([action.payload.regUser]),
      };
    case actionTypes.REGIST_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };


    case actionTypes.FETCH_ASSIGNED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
        
    case actionTypes.FETCH_ASSIGNED_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        loaded: true,
        users: state.users.concat([action.payload.usersList]),
      };
    case actionTypes.FETCH_ASSIGNED_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionTypes.FETCH_UNASSIGNED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

      //UNASSIGNED
          
    case actionTypes.FETCH_UNASSIGNED_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        loaded: true,
        notAsssigned: state.notAsssigned.concat([action.payload.unAssigned]),
      };
    case actionTypes.FETCH_UNASSIGNED_ERROR:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };

    case actionTypes.CLEAR_USER:
      return{
        ...state,
        currentUser: null,
      };
    default: return state
  }
}


