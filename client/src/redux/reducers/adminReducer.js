import {
  LOGIN_ADMIN,
  LOAD_ADMIN,
  EDIT_ADMIN,
  ADMIN_GET_CHATROOMS,
  SELECT_CHATROOM_ADMIN,
  ADMIN_GET_MESSAGES,
  APPEND_ADMIN_MESSAGE,
  CLEAR_ADMIN_CHATROOM,
  ADMIN_ERROR,
  ADMIN_MESSAGE,
  ADMIN_LOADING,
  ADMIN_CHATROOM_LOADING,
  CLEAR_ADMIN_ERROR,
} from "../types";

const defaultState = {
  admin: null,
  isAuthenticated: false,
  chatrooms: [],
  active_chatroom: null,
  admin_messages: [],
  message_end: false,
  error: null,
  message: null,
  chatroomLoading: false,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
    case LOAD_ADMIN:
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case EDIT_ADMIN:
      return {
        ...state,
        admin: action.payload.admin,
        message: action.payload.message,
      };
    case ADMIN_GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case SELECT_CHATROOM_ADMIN:
      return {
        ...state,
        active_chatroom: action.payload,
        chatroomLoading: false,
      };
    case ADMIN_GET_MESSAGES:
      return {
        ...state,
        active_chatroom: { ...state.active_chatroom, unreadMessages: 0 },
        admin_messages: [...state.admin_messages, ...action.payload.messages],
        message_end: action.payload.end,
      };
    case APPEND_ADMIN_MESSAGE:
      return {
        ...state,
        admin_messages: [action.payload, ...state.admin_messages],
      };
    case CLEAR_ADMIN_CHATROOM:
      return {
        ...state,
        active_chatroom: null,
        admin_messages: [],
        message_end: false,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADMIN_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case ADMIN_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADMIN_CHATROOM_LOADING:
      return {
        ...state,
        chatroomLoading: action.payload,
      };
    case CLEAR_ADMIN_ERROR:
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
