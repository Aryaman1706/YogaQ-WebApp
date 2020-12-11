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
  APPEND_USER_MESSAGE,
  CLEAR_USER_CHATROOM,
  USER_ERROR,
  USER_MESSAGE,
  USER_LOADING,
  USER_CHATROOM_LOADING,
  CLEAR_USER_ERROR,
  CLEAR_UNREAD_MESSAGES,
  CLEAR_UNREAD_MESSAGES_ACTIVE,
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
  chatroomLoading: false,
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
        chatroomLoading: false,
      };
    case USER_GET_MESSAGES:
      return {
        ...state,
        user_messages: [...state.user_messages, ...action.payload.messages],
        message_end: action.payload.end,
      };
    case APPEND_USER_MESSAGE:
      return {
        ...state,
        user_messages: [action.payload, ...state.user_messages],
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
    case USER_CHATROOM_LOADING:
      return {
        ...state,
        chatroomLoading: action.payload,
      };
    case CLEAR_USER_ERROR:
      return {
        ...state,
        error: null,
        message: null,
        query: null,
      };
    case CLEAR_UNREAD_MESSAGES:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case CLEAR_UNREAD_MESSAGES_ACTIVE:
      return {
        ...state,
        active_chatroom: action.payload,
      };
    default:
      return state;
  }
};

export default stateHandler;
