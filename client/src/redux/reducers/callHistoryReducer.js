import {
  LIST_USER_CALL_HISTORY,
  LIST_USER_CALL_HISTORY_ERROR,
  CLEAR_CALL_HISTORY_LIST,
} from "../types";

const defaultState = {
  list: [],
  end: false,
  callHistory: null,
  error: null,
  message: null,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LIST_USER_CALL_HISTORY:
      return {
        ...state,
        list: [...state.list, ...action.payload.calls],
        end: action.payload.end,
      };
    case CLEAR_CALL_HISTORY_LIST:
      return {
        ...state,
        list: [],
        end: false,
      };
    case LIST_USER_CALL_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default stateHandler;
