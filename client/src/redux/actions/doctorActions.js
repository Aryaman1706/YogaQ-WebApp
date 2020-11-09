import {
  LOGIN_DOCTOR,
  CHANGE_PASSWORD_DOCTOR,
  DOCTOR_ERROR,
  LOAD_DOCTOR,
  LOAD_DOCTOR_COMPLETE,
} from "../types";
import axios from "../../utils/axios";

// * Login as Doctor
export const loginDoctor = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/doctor/login", formData);
    if (res.data.error) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOGIN_DOCTOR,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Load Doctor
export const loadDoctor = () => async (dispatch) => {
  try {
    const res = await axios.get("/doctor/profile?complete=false");
    if (res.data.error) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOAD_DOCTOR,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Load Doctor (Complete)
export const loadDoctorComplete = () => async (dispatch) => {
  try {
    const res = await axios.get("/doctor/profile?complete=true");
    if (res.data.error) {
      dispatch({
        type: DOCTOR_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOAD_DOCTOR_COMPLETE,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Change Password

// * Clear Errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: DOCTOR_ERROR,
    payload: null,
  });
};
