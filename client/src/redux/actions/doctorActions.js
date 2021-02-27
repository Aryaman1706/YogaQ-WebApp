import {
  LOGIN_DOCTOR,
  LOAD_DOCTOR,
  LOAD_DOCTOR_COMPLETE,
  EDIT_DOCTOR,
  LIST_DOCTOR,
  CLEAR_DOCTOR_LIST,
  SELECT_DOCTOR,
  DOCTOR_ERROR,
  DOCTOR_MESSAGE,
  DOCTOR_LOADING,
  CLEAR_DOCTOR_ERROR,
  DOCTOR_GET_CHATROOMS,
  DOCTOR_CHATROOM_LOADING,
  SELECT_CHATROOM_DOCTOR,
  CLEAR_UNREAD_MESSAGES_DOCTOR,
  APPEND_DOCTOR_MESSAGE,
  CLEAR_DOCTOR_CHATROOM,
  DOCTOR_GET_MESSAGES,
  DOCTOR_ADD_QUESTION_TO_QUESTION_SET,
  DOCTOR_REMOVE_QUESTION_TO_QUESTION_SET,
  GET_DOCTOR_QUESTION_SET,
  GET_DOCTOR_CHATROOM_CALLS,
  ACCEPT_CALL,
  COMPLETE_CALL,
  CLEAR_ACTIVE_CHATROOM_DOCTOR,
} from "../types";
import axios from "../../utils/axios";
import store from "../store";
import Swal from "sweetalert2";

// * Login as Doctor
export const loginDoctor = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/doctor/login", formData);
    dispatch({
      type: LOGIN_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data?.error,
    });
  }
};

// * Load Doctor
export const loadDoctor = (complete) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/profile?complete=${complete}`);
    if (complete) {
      dispatch({
        type: LOAD_DOCTOR_COMPLETE,
        payload: res.data.body,
      });
    } else {
      dispatch({
        type: LOAD_DOCTOR,
        payload: res.data.body,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Edit Profile
export const editProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/doctor/profile", formData);
    dispatch({
      type: EDIT_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Change Password
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await axios.put("/doctor/", formData);
    dispatch({
      type: DOCTOR_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * List Doctors
export const listDoctor = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/list/?page=${page}`);
    dispatch({
      type: LIST_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear List
export const clearList = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DOCTOR_LIST,
    payload: null,
  });
};

// * Select Doctor
export const selectDoctor = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/doctor/view/${id}`);
    dispatch({
      type: SELECT_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Clear Select Doctor
export const clearSelected = () => async (dispatch) => {
  dispatch({
    type: SELECT_DOCTOR,
    payload: null,
  });
};

// * Get my chatrooms
export const listChatrooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/doctor/chatrooms");

    dispatch({
      type: DOCTOR_GET_CHATROOMS,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get chatroom contents
export const getChatroom = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/get/${id}`);
    dispatch({
      type: SELECT_CHATROOM_DOCTOR,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Set unread messages to 0
export const clearUnreadMessages = (id) => async (dispatch) => {
  const storeState = store.getState();
  const newChatrooms = storeState.doctor.chatrooms.map((item) => {
    if (item._id === id) {
      const newItem = { ...item, unreadMessages: 0 };
      return newItem;
    } else {
      return item;
    }
  });
  dispatch({
    type: CLEAR_UNREAD_MESSAGES_DOCTOR,
    payload: newChatrooms,
  });
};

// * Send/Recieve Message
export const appendMessage = (data) => async (dispatch) => {
  dispatch({
    type: APPEND_DOCTOR_MESSAGE,
    payload: data,
  });
};

// * Modify Last access
export const modifyLastAccess = () => async (dispatch) => {
  try {
    // await axios.put(`/chatroom/lastAccess/${id}`, formData);
    dispatch({
      type: CLEAR_DOCTOR_CHATROOM,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response?.data?.error,
    });
  }
};

// * Get Messages of active chatroom
export const getMessages = ({ id, page }) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/messages/${id}/?page=${page}`);
    dispatch({
      type: DOCTOR_GET_MESSAGES,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: DOCTOR_LOADING,
    payload: value,
  });
};

// * Set Chatroom Loading
export const setChatroomLoading = (value) => async (dispatch) => {
  dispatch({
    type: DOCTOR_CHATROOM_LOADING,
    payload: value,
  });
};

// * Clear Errors
export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DOCTOR_ERROR,
    payload: null,
  });
};

// * Add question
export const addQuestionToQuestionSet = ({ chatroomId, question }) => async (
  dispatch
) => {
  try {
    const res = await axios.put(
      `/questionSet/addQuestion/${chatroomId}`,
      question
    );
    dispatch({
      type: DOCTOR_ADD_QUESTION_TO_QUESTION_SET,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get questionSet
export const getQuestionSet = (chatroomId) => async (dispatch) => {
  try {
    const res = await axios.get(`/questionSet/doctor/get/${chatroomId}`);
    dispatch({
      type: GET_DOCTOR_QUESTION_SET,
      payload: res.data.body,
    });
  } catch (error) {
    if (error.response.data.error === "Invalid Question Set.") {
      Swal.fire({
        title: "Error",
        text: "No question set found for this chatroom.",
        icon: "error",
        showConfirmButton: true,
      });
    }
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Remove question from questionSet
export const removeQuestionToQuestionSet = ({
  chatroomId,
  questionId,
}) => async (dispatch) => {
  try {
    const storeState = store.getState();
    const questions = storeState.doctor.questionSet.questions.filter(
      (question) =>
        question._id.toString().trim() !== questionId.toString().trim()
    );

    axios.put(`/questionSet/removeQuestion/${chatroomId}`, {
      questionId,
    });
    dispatch({
      type: DOCTOR_REMOVE_QUESTION_TO_QUESTION_SET,
      payload: { message: "Question removed successfully.", questions },
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * List all calls by chatroomId
export const listCallsByChatroom = (id, page) => async (dispatch) => {
  try {
    const res = await axios.get(`/call/list/${id}?page=${page}`);
    if (res) {
      dispatch({
        type: GET_DOCTOR_CHATROOM_CALLS,
        payload: res.data.body,
      });
    }
  } catch (error) {
    dispatch({
      type: DOCTOR_ERROR,
      payload: error,
    });
  }
};

// * Accept a call
export const acceptCall = (id) => async (dispatch) => {
  try {
    const storeState = store.getState();
    const res = await axios.put(`/call/accept/${id}`, {
      accepted: true,
    });
    if (res?.status === 200) {
      const newCallList = storeState.doctor.calls.map((item) => {
        if (item._id === id) {
          const newItem = { ...item, accepted: true };
          return newItem;
        } else {
          return item;
        }
      });
      Swal.fire({
        title: "Accepted Call",
        icon: "success",
      });
      dispatch({
        type: ACCEPT_CALL,
        payload: newCallList,
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Something went wrong",
      icon: "error",
    });
    dispatch({
      type: DOCTOR_ERROR,
      payload: error,
    });
  }
};

// * Complete a call
export const completeCall = (id) => async (dispatch) => {
  try {
    const storeState = store.getState();
    const res = await axios.put(`/call/complete/${id}`, {
      completed: true,
    });
    if (res?.status === 200) {
      const newCallList = storeState.doctor.calls.map((item) => {
        if (item._id === id) {
          const newItem = { ...item, completed: true };
          return newItem;
        } else {
          return item;
        }
      });
      Swal.fire({
        title: "Completed Call",
        icon: "success",
      });
      dispatch({
        type: COMPLETE_CALL,
        payload: newCallList,
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Something went wrong",
      icon: "error",
    });
    dispatch({
      type: DOCTOR_ERROR,
      payload: error,
    });
  }
};

// * Set active chatroom to null
export const clearActiveChatroom = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ACTIVE_CHATROOM_DOCTOR,
  });
};
