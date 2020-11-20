import {
  LIST_ENQUIRY,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY_LIST,
  ENQUIRY_ERROR,
  ENQUIRY_MESSAGE,
  ENQUIRY_LOADING,
  CLEAR_ENQUIRY_ERROR,
} from "../types";
import axios from "../../utils/axios";

// * Create new enquiry
export const createEnquiry = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/doctor/enquire", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: ENQUIRY_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ENQUIRY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * List Enquiries
export const listEnquiries = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/enquiry/list?page=${page}`);
    dispatch({
      type: LIST_ENQUIRY,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ENQUIRY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear List
export const clearList = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ENQUIRY_LIST,
    payload: null,
  });
};

// * Select Enquiry
export const selectEnquiry = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/enquiry/view/${id}`);
    dispatch({
      type: SELECT_ENQUIRY,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ENQUIRY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Delete Enquiry
export const deleteEnquiry = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/doctor/delete/${id}`);
    dispatch({
      type: ENQUIRY_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ENQUIRY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Register Enquiry
export const registerEnquiry = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/doctor/register", formData);
    dispatch({
      type: ENQUIRY_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ENQUIRY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear Enquiry
export const clearEnquiry = () => async (dispatch) => {
  dispatch({
    type: SELECT_ENQUIRY,
    payload: null,
  });
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: ENQUIRY_LOADING,
    payload: value,
  });
};

// * Clear errors
export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ENQUIRY_ERROR,
    payload: null,
  });
};
