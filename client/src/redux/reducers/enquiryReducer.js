import {
  LIST_ENQUIRY,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY_LIST,
  ENQUIRY_ERROR,
  ENQUIRY_MESSAGE,
  ENQUIRY_LOADING,
  CLEAR_ENQUIRY_ERROR,
} from "../types";

const defaultState = {
  list: [],
  end: false,
  enquiry: null,
  error: null,
  message: null,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LIST_ENQUIRY:
      return {
        ...state,
        list: [...state.list, ...action.payload.enquiries],
        end: action.payload.end,
        loading: false,
      };
    case SELECT_ENQUIRY:
      return {
        ...state,
        enquiry: action.payload,
        loading: action.payload ? false : true,
      };
    case CLEAR_ENQUIRY_LIST:
      return {
        ...state,
        list: [],
        end: false,
        loading: true,
      };
    case ENQUIRY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ENQUIRY_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case ENQUIRY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_ENQUIRY_ERROR:
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
