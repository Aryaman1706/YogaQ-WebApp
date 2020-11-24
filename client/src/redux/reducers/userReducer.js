import {
  LOAD_USER,
  INCOMPLETE_PROFILE,
  EDIT_USER,
  GET_CHATROOMS,
  LIST_USER,
  CLEAR_USER_LIST,
  SELECT_USER,
  SELECT_CHATROOM_USER,
  USER_GET_MESSAGES,
  CLEAR_USER_CHATROOM,
  USER_ERROR,
  USER_MESSAGE,
  USER_LOADING,
  CLEAR_USER_ERROR,
} from "../types";

const defaultState = {
  user: null,
  isAuthenticated: null,
  chatrooms: [],
  active_chatroom: null,
  user_messages: [],
  message_end: false,
  list: [],
  end: false,
  selectUser: null,
  query: null,
  error: null,
  message: null,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case INCOMPLETE_PROFILE:
      return {
        ...state,
        error: action.payload.error,
        query: action.payload.query,
      };
    case EDIT_USER:
      return {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
      };
    case GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case LIST_USER:
      return {
        ...state,
        list: [...state.list, ...action.payload.users],
        end: action.payload.end,
      };
    case CLEAR_USER_LIST:
      return {
        ...state,
        list: [],
        end: false,
      };
    case SELECT_USER:
      return {
        ...state,
        selectUser: action.payload,
      };
    case SELECT_CHATROOM_USER:
      return {
        ...state,
        active_chatroom: action.payload,
      };
    case USER_GET_MESSAGES:
      return {
        ...state,
        active_chatroom: { ...state, unreadMessages: 0 },
        user_messages: [...action.payload.messages, ...state.user_messages],
        message_end: action.payload.end,
      };
    case CLEAR_USER_CHATROOM:
      return {
        ...state,
        active_chatroom: null,
        user_messages: [],
        message_end: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case USER_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
        message: null,
        query: null,
      };
    default:
      return state;
  }
};

export default stateHandler;
