import {
  LOGIN_DOCTOR,
  LOAD_DOCTOR,
  LOAD_DOCTOR_COMPLETE,
  EDIT_DOCTOR,
  LIST_DOCTOR,
  CLEAR_DOCTOR_LIST,
  SELECT_DOCTOR,
  DOCTOR_ERROR,
  DOCTOR_MESSAGE,
  DOCTOR_LOADING,
  CLEAR_DOCTOR_ERROR,
  DOCTOR_GET_CHATROOMS,
  SELECT_CHATROOM_DOCTOR,
  CLEAR_UNREAD_MESSAGES_DOCTOR,
  APPEND_DOCTOR_MESSAGE,
  CLEAR_DOCTOR_CHATROOM,
  DOCTOR_GET_MESSAGES,
  DOCTOR_CHATROOM_LOADING,
  DOCTOR_ADD_QUESTION_TO_QUESTION_SET,
  DOCTOR_REMOVE_QUESTION_TO_QUESTION_SET,
  GET_DOCTOR_QUESTION_SET,
  GET_DOCTOR_CHATROOM_CALLS,
  ACCEPT_CALL,
  COMPLETE_CALL,
  CLEAR_ACTIVE_CHATROOM_DOCTOR,
  LOGOUT_DOCTOR,
} from "../types";
import pick from "lodash/pick";

const defaultState = {
  doctor: null,
  isAuthenticated: false,
  completeProfile: null,
  chatrooms: [],
  active_chatroom: null,
  questionSet: null,
  calls: [],
  doctor_messages: [],
  message_end: false,
  list: [],
  end: false,
  selectDoctor: null,
  error: null,
  message: null,
  chatroomLoading: false,
  loading: true,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_DOCTOR:
    case LOAD_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_DOCTOR_COMPLETE:
      return {
        ...state,
        doctor: pick(action.payload, [
          "username",
          "email",
          "role",
          "restricted",
        ]),
        completeProfile: action.payload,
        isAuthenticated: true,
      };
    case EDIT_DOCTOR:
      return {
        ...state,
        doctor: action.payload.doctor,
        message: action.payload.message,
      };
    case LIST_DOCTOR:
      return {
        ...state,
        list: [...state.list, ...action.payload.doctors],
        end: action.payload.end,
      };
    case CLEAR_DOCTOR_LIST:
      return {
        ...state,
        list: [],
        end: false,
      };
    case SELECT_DOCTOR:
      return {
        ...state,
        selectDoctor: action.payload,
      };
    case DOCTOR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DOCTOR_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case DOCTOR_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case CLEAR_DOCTOR_ERROR:
      return {
        ...state,
        error: null,
        message: null,
      };
    case DOCTOR_GET_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case SELECT_CHATROOM_DOCTOR:
      return {
        ...state,
        active_chatroom: action.payload,
        doctor_messages: [],
        message_end: false,
        chatroomLoading: false,
      };
    case CLEAR_UNREAD_MESSAGES_DOCTOR:
      return {
        ...state,
        chatrooms: action.payload,
      };
    case APPEND_DOCTOR_MESSAGE:
      return {
        ...state,
        doctor_messages: [action.payload, ...state.doctor_messages],
      };
    case DOCTOR_GET_MESSAGES:
      return {
        ...state,
        active_chatroom: { ...state.active_chatroom, unreadMessages: 0 },
        doctor_messages: [...state.doctor_messages, ...action.payload.messages],
        message_end: action.payload.end,
      };
    case CLEAR_DOCTOR_CHATROOM:
      return {
        ...state,
        // active_chatroom: null,
        doctor_messages: [],
        message_end: false,
      };
    case DOCTOR_CHATROOM_LOADING:
      return {
        ...state,
        chatroomLoading: action.payload,
      };
    case DOCTOR_ADD_QUESTION_TO_QUESTION_SET:
      return {
        ...state,
        message: action.payload.message,
        questionSet: [...state.questionSet.questions, action.payload.question],
      };
    case DOCTOR_REMOVE_QUESTION_TO_QUESTION_SET:
      return {
        ...state,
        questionSet: {
          ...state.questionSet,
          questions: action.payload.questions,
        },
        message: action.payload.message,
      };
    case GET_DOCTOR_QUESTION_SET:
      return {
        ...state,
        questionSet: action.payload,
      };
    case GET_DOCTOR_CHATROOM_CALLS:
      return {
        ...state,
        calls: [...state.calls, ...action.payload.calls],
        end: action.payload.end,
      };
    case ACCEPT_CALL:
    case COMPLETE_CALL:
      return {
        ...state,
        calls: action.payload,
      };
    case CLEAR_ACTIVE_CHATROOM_DOCTOR:
      return {
        ...state,
        active_chatroom: null,
      };
    case LOGOUT_DOCTOR:
      return {
        ...state,
        doctor: null,
        isAuthenticated: false,
        chatrooms: [],
        active_chatroom: null,
        doctor_messages: [],
      };
    default:
      return state;
  }
};

export default stateHandler;
