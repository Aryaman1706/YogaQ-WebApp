import {
  LOGIN_ADMIN,
  ADMIN_ERROR,
  LOAD_ADMIN,
  EDIT_ADMIN,
  CHANGE_PASSWORD,
  REGISTER_ADMIN,
} from "../types";
import axios from "../../utils/axios";

// * Login as Admin
export const loginAdmin = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/login", formData);
    dispatch({
      type: LOGIN_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/profile");
    dispatch({
      type: LOAD_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Edit Admin
export const editAdmin = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/admin/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: EDIT_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Change Password
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/admin/changePassword", formData);
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Register Admin
export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/register", formData);

    dispatch({
      type: REGISTER_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
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
  });
};
