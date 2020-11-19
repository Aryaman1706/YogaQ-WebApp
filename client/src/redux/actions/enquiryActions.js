import {
  ENQUIRY_ERROR,
  NEW_ENQUIRY,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY,
  LIST_ENQUIRY,
  ENQUIRY_LOADING,
  CLEAR_ENQUIRY_LIST,
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
    if (res.data.error) {
      dispatch({
        type: ENQUIRY_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: NEW_ENQUIRY,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: ENQUIRY_ERROR,
      payload: "Request Failed.",
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
export const selectEnquiry = (enquiry) => async (dispatch) => {
  dispatch({
    type: SELECT_ENQUIRY,
    payload: enquiry,
  });
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: ENQUIRY_LOADING,
    payload: value,
  });
};

// * Clear Enquiry
export const clearEnquiry = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ENQUIRY,
    payload: null,
  });
};

// * Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: ENQUIRY_ERROR,
    payload: null,
  });
};
