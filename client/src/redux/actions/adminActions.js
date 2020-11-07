import { LOGIN_ADMIN, ADMIN_ERROR } from "../types";
import axios from "../../utils/axios";

//* Login as Admin
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
    dispatch({
      type: ADMIN_ERROR,
      payload: "Request Failed.",
    });
  }
};
