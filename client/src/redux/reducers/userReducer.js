import { LOAD_USER, USER_ERROR } from "../types";

const defaultState = {
  user: null,
  error: null,
  isAuthenticated: null,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stateHandler;
