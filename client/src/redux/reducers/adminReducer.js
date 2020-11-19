import {
  LOGIN_ADMIN,
  ADMIN_ERROR,
  LOAD_ADMIN,
  EDIT_ADMIN,
  ADMIN_LOADING,
  ADMIN_MESSAGE,
  CLEAR_ADMIN_ERROR,
} from "../types";

const defaultState = {
  admin: null,
  error: null,
  message: null,
  isAuthenticated: false,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
    case LOAD_ADMIN:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case EDIT_ADMIN:
      return {
        ...state,
        admin: action.payload.admin,
        message: action.payload.message,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADMIN_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case ADMIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_ADMIN_ERROR:
      return {
        ...state,
        error: null,
        message: null,
      };
    default:
      return state;
  }
};

export default stateHandler;
