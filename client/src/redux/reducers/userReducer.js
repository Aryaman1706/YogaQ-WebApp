import {
  LOAD_USER,
  USER_ERROR,
  INCOMPLETE_PROFILE,
  SIGNUP_USER,
  GET_CHATROOMS,
  EDIT_USER,
} from "../types";

const defaultState = {
  user: null,
  chatrooms: null,
  query: null,
  error: null,
  message: null,
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
    case EDIT_USER:
      return{
        ...state,
        user: action.payload,
        message: "Profile updated successfully."
      }
    case SIGNUP_USER:
      return {
        ...state,
        message: "Congratulations! User Profile Complete!",
        user: action.payload,
        isAuthenticated: true,
        error: null,
        query: null,
      };
    case INCOMPLETE_PROFILE:
      return {
        ...state,
        error: action.payload.error,
        query: action.payload.query,
      };
    case GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
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
