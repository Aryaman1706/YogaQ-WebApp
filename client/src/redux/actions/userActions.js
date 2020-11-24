import {
  LOAD_USER,
  INCOMPLETE_PROFILE,
  EDIT_USER,
  GET_CHATROOMS,
  LIST_USER,
  CLEAR_USER_LIST,
  SELECT_USER,
  SELECT_CHATROOM_USER,
  USER_GET_MESSAGES,
  USER_ERROR,
  USER_MESSAGE,
  USER_LOADING,
  USER_CHATROOM_LOADING,
  CLEAR_USER_ERROR,
  CLEAR_USER_CHATROOM,
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
    } else {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error,
      });
    }
  }
};

// * SignUp User with missing credentials
export const sigupUser = (formdata) => async (dispatch) => {
  try {
    const res = await axios.put("/user/signup", formdata);
    dispatch({
      type: EDIT_USER,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get my chatrooms
export const listChatrooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/user/chatrooms");

    dispatch({
      type: GET_CHATROOMS,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get chatroom contents
export const getChatroom = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/get/${id}`);
    dispatch({
      type: SELECT_CHATROOM_USER,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get Messages of active chatroom
export const getMessages = ({ id, page }) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/messages/${id}/?page=${page}`);
    dispatch({
      type: USER_GET_MESSAGES,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Modify Last access
export const modfiyLastAccess = ({ id, formData }) => async (dispatch) => {
  try {
    await axios.put(`/chatroom/lastAccess/${id}`, formData);
    dispatch({
      type: CLEAR_USER_CHATROOM,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
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
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
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

// * List User
export const listUser = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/list/?page=${page}`);
    dispatch({
      type: LIST_USER,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear user list
export const clearListUser = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_LIST,
    payload: null,
  });
};

// * Select User
export const selectUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/user/view/${id}`);
    dispatch({
      type: SELECT_USER,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear Selected User
export const clearSelectedUser = () => async (dispatch) => {
  dispatch({
    type: SELECT_USER,
    payload: null,
  });
};

// * Block/Unblock User
export const blockUser = ({ id, value }) => async (dispatch) => {
  try {
    const res = await axios.put(`/user/block/${id}`, value);
    dispatch({
      type: USER_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: value,
  });
};

// * Set Chatroom Loading
export const setChatroomLoading = (value) => async (dispatch) => {
  dispatch({
    type: USER_CHATROOM_LOADING,
    payload: value,
  });
};

// * Clear Errors
export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USER_ERROR,
    payload: null,
  });
};
