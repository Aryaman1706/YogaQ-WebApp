import { LOGIN_ADMIN, ADMIN_ERROR, LOAD_ADMIN, EDIT_ADMIN } from "../types";
import axios from "../../utils/axios";

// * Login as Admin
export const loginAdmin = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/login", formData);
    if (res.data.error) {
      dispatch({
        type: ADMIN_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOGIN_ADMIN,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/profile");
    if (res.data.error) {
      dispatch({
        type: ADMIN_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOAD_ADMIN,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: "Request Failed.",
    });
  }
};

export const editAdmin = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/admin/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.error) {
      dispatch({
        type: ADMIN_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: EDIT_ADMIN,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: "Request Failed.",
    });
  }
};

// * Clear Error
export const errorAdmin = () => async (dispatch) => {
  dispatch({
    type: ADMIN_ERROR,
    payload: null,
  });
};
