import {
  LOGIN_ADMIN,
  ADMIN_ERROR,
  LOAD_ADMIN,
  EDIT_ADMIN,
  CHANGE_PASSWORD,
  REGISTER_ADMIN,
} from "../types";

const defaultState = {
  admin: null,
  error: null,
  message: null,
  isAuthenticated: false,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
    case LOAD_ADMIN:
    case EDIT_ADMIN:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case CHANGE_PASSWORD:
    case REGISTER_ADMIN:
      return {
        ...state,
        message: action.payload,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default stateHandler;
