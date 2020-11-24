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
} from "../types";
import pick from "lodash/pick";

const defaultState = {
  doctor: null,
  isAuthenticated: false,
  completeProfile: null,
  list: [],
  end: false,
  selectDoctor: null,
  error: null,
  message: null,
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
    default:
      return state;
  }
};

export default stateHandler;
