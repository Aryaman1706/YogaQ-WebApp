import { LOGIN_ADMIN, ADMIN_ERROR } from "../types";

const defaultState = {
  admin: null,
  error: null,
  isAuthenticated: false,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stateHandler;
