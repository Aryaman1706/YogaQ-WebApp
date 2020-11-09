import { NEW_ENQUIRY, ENQUIRY_ERROR } from "../types";

const defaultState = {
  message: null,
  error: null,
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
    default:
      return state;
  }
};
export default stateHandler;
