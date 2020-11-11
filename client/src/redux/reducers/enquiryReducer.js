import {
  NEW_ENQUIRY,
  ENQUIRY_ERROR,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY,
} from "../types";

const defaultState = {
  message: null,
  error: null,
  enquiry: null,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case NEW_ENQUIRY:
      return {
        ...state,
        message: action.payload,
      };
    case ENQUIRY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SELECT_ENQUIRY:
      return {
        ...state,
        enquiry: action.payload,
      };
    case CLEAR_ENQUIRY:
      return {
        ...state,
        enquiry: null,
      };
    default:
      return state;
  }
};
export default stateHandler;
