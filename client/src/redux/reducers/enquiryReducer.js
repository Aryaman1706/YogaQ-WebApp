import {
  NEW_ENQUIRY,
  ENQUIRY_ERROR,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY,
  LIST_ENQUIRY,
  ENQUIRY_LOADING,
  CLEAR_ENQUIRY_LIST,
} from "../types";

const defaultState = {
  message: null,
  error: null,
  enquiry: null,
  list: [],
  end: false,
  loading: true,
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
    case LIST_ENQUIRY:
      return {
        ...state,
        loading: false,
        end: action.payload.end,
        list: [...state.list, ...action.payload.enquiries],
      };
    case CLEAR_ENQUIRY_LIST:
      return {
        ...state,
        list: [],
        end: false,
        loading: true,
      };
    case ENQUIRY_LOADING:
      return {
        ...state,
        loading: action.payload,
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
