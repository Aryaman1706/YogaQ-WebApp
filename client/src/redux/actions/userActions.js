import { LOAD_USER, USER_ERROR } from "../types";
import axios from "../../utils/axios";

// * Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/profile");
    if (res.data.error) {
      dispatch({
        type: USER_ERROR,
        payload: res.data.error,
      });
    } else {
      dispatch({
        type: LOAD_USER,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: USER_ERROR,
      payload: "Request Failed.",
    });
  }
};
