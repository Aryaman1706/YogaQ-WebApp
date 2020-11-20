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
import axios from "../../utils/axios";

// * Login as Doctor
export const loginDoctor = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/doctor/login", formData);
    dispatch({
      type: LOGIN_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Load Doctor
export const loadDoctor = (complete) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/profile?complete=${complete}`);
    if (complete) {
      dispatch({
        type: LOAD_DOCTOR_COMPLETE,
        payload: res.data.body,
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
      payload: error.response.data.error,
    });
  }
};

// * Edit Profile
export const editProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/doctor/profile", formData);
    dispatch({
      type: EDIT_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Change Password
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/doctor/", formData);
    dispatch({
      type: DOCTOR_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * List Doctors
export const listDoctor = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/list/?page=${page}`);
    dispatch({
      type: LIST_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear List
export const clearList = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DOCTOR_LIST,
    payload: null,
  });
};

// * Select Doctor
export const selectDoctor = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/view/${id}`);
    dispatch({
      type: SELECT_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear Select Doctor
export const clearSelected = () => async (dispatch) => {
  dispatch({
    type: SELECT_DOCTOR,
    payload: null,
  });
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: DOCTOR_LOADING,
    payload: value,
  });
};

// * Clear Errors
export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DOCTOR_ERROR,
    payload: null,
  });
};
