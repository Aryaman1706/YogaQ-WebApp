import {
  ENQUIRY_ERROR,
  NEW_ENQUIRY,
  SELECT_ENQUIRY,
  CLEAR_ENQUIRY,
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

// * Select Enquiry
export const selectEnquiry = (enquiry) => async (dispatch) => {
  dispatch({
    type: SELECT_ENQUIRY,
    payload: enquiry,
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
