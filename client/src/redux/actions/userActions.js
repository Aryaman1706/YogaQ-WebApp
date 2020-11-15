import {
  LOAD_USER,
  USER_ERROR,
  INCOMPLETE_PROFILE,
  SIGNUP_USER,
  GET_CHATROOMS,
  EDIT_USER,
} from "../types";
import axios from "../../utils/axios";

// * Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/profile");
    dispatch({
      type: LOAD_USER,
      payload: res.data.body,
    });
  } catch (error) {
    if (error.response.status === 401) {
      dispatch({
        type: INCOMPLETE_PROFILE,
        payload: {
          error: error.response.data.error,
          query: error.response.data.body,
        },
      });
    } else if (error.response.status === 404) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error,
      });
    } else {
      dispatch({
        type: USER_ERROR,
        payload: "Request Failed.",
      });
    }
  }
};

// * SignUp User with missing credentials
export const sigupUser = (formdata) => async (dispatch) => {
  try {
    const res = await axios.put("/user/signup", formdata);
    dispatch({
      type: SIGNUP_USER,
      payload: res.data.body,
    });
  } catch (error) {
    if (error.response.status === 400) {
      dispatch({
        type: USER_ERROR,
        payload: `Validation Error ${error.response.data.error}`,
      });
    } else {
      dispatch({
        type: USER_ERROR,
        payload: "Request Failed.",
      });
    }
  }
};

// * Get my chatrooms
export const listChatrooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/chatrooms");
    if (res.status === 200) {
      dispatch({
        type: GET_CHATROOMS,
        payload: res.data.body,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Edit Profile
export const editProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/user/profile", formData);
    dispatch({
      type: EDIT_USER,
      payload: res.data.body,
    });
  } catch (error) {
    if (error.response.status === 400) {
      dispatch({
        type: USER_ERROR,
        payload: `Validation Error ${error.response.data.error}`,
      });
    } else if (error.response.status === 404) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

// * Clear Incomplete Profile
export const clearIncompleteProfile = () => async (dispatch) => {
  dispatch({
    type: INCOMPLETE_PROFILE,
    payload: {
      error: null,
      query: null,
    },
  });
};
