import {
  CLEAR_CALL_HISTORY_LIST,
  LIST_USER_CALL_HISTORY,
  LIST_USER_CALL_HISTORY_ERROR,
} from "../types";
import axios from "../../utils/axios";

// * List Enquiries
export const listEnquiries = (page, chatroomId) => async (dispatch) => {
  try {
    const res = await axios.get(`/call/list/${chatroomId}?page=${page}`);
    console.log(res.data);
    dispatch({
      type: LIST_USER_CALL_HISTORY,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: LIST_USER_CALL_HISTORY_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear List
export const clearList = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CALL_HISTORY_LIST,
    payload: null,
  });
};
