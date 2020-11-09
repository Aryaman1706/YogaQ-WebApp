import { ENQUIRY_ERROR, NEW_ENQUIRY } from "../types";
import axios from "../../utils/axios";

// * Create new enquiry
export const createEnquiry = (formData) => async (dispatch) => {
  console.log(formData);
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

// * Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: ENQUIRY_ERROR,
    payload: null,
  });
};
