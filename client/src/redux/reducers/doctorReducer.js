import {
  LOGIN_DOCTOR,
  DOCTOR_ERROR,
  CHANGE_PASSWORD_DOCTOR,
  LOAD_DOCTOR,
  LOAD_DOCTOR_COMPLETE,
} from "../types";
import pick from "lodash/pick";

const defaultState = {
  doctor: null,
  error: null,
  message: null,
  isAuthenticated: false,
  completeProfile: null,
};

const stateHandler = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_DOCTOR:
    case LOAD_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
        isAuthenticated: true,
        error: null,
        message: null,
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
        error: null,
        message: null,
      };
    case DOCTOR_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    default:
      return state;
  }
};

export default stateHandler;
