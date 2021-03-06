import {
  LOGIN_ADMIN,
  LOAD_ADMIN,
  LOGOUT_ADMIN,
  EDIT_ADMIN,
  ADMIN_GET_CHATROOMS,
  SELECT_CHATROOM_ADMIN,
  ADMIN_GET_MESSAGES,
  APPEND_ADMIN_MESSAGE,
  CLEAR_ADMIN_CHATROOM,
  ADMIN_ERROR,
  ADMIN_MESSAGE,
  ADMIN_LOADING,
  ADMIN_CHATROOM_LOADING,
  CLEAR_ADMIN_ERROR,
  CLEAR_UNREAD_MESSAGES_ACTIVE_ADMIN,
  CLEAR_ADMIN_ACTIVE_CHATROOM,
  CLEAR_UNREAD_MESSAGES_ADMIN,
  ADD_QUESTION_TO_QUESTION_SET,
  REMOVE_QUESTION_TO_QUESTION_SET,
  GET_ADMIN_QUESTION_SET,
} from "../types";
import axios from "../../utils/axios";
import store from "../store";
import Swal from "sweetalert2";

// * Login as Admin
export const loginAdmin = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/admin/login", formData);
    dispatch({
      type: LOGIN_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.error,
    });
  }
};

// * Logout Admin
export const logoutAdmin = () => async (dispatch) => {
  try {
    await axios.get("/admin/logout");
    dispatch({
      type: LOGOUT_ADMIN,
      payload: null,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.error,
    });
  }
};

// * Edit Admin
export const editAdmin = (formData) => async (dispatch) => {
  try {
    // const res = await axios.put("/admin/profile", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    const res = await axios.put("/admin/profile", formData);
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
      type: ADMIN_MESSAGE,
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
      type: ADMIN_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Create Chatroom
export const createChatroom = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/chatroom/create", formData);
    dispatch({
      type: ADMIN_MESSAGE,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get my chatrooms
export const listChatrooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/admin/chatrooms");

    dispatch({
      type: ADMIN_GET_CHATROOMS,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get chatroom contents
export const getChatroom = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/get/${id}`);
    dispatch({
      type: SELECT_CHATROOM_ADMIN,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get Messages of active chatroom
export const getMessages = ({ id, page }) => async (dispatch) => {
  try {
    const res = await axios.get(`/chatroom/messages/${id}/?page=${page}`);
    dispatch({
      type: ADMIN_GET_MESSAGES,
      payload: res.data.body,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Send/Recieve Message
export const appendMessage = (data) => async (dispatch) => {
  dispatch({
    type: APPEND_ADMIN_MESSAGE,
    payload: data,
  });
};

// * Modify Last access
export const modifyLastAccess = ({ id, formData }) => async (dispatch) => {
  try {
    await axios.put(`/chatroom/lastAccess/${id}`, formData);
    dispatch({
      type: CLEAR_ADMIN_CHATROOM,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data?.error,
    });
  }
};

// * Set Loading
export const setLoading = (value) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOADING,
    payload: value,
  });
};

// * Set Chatroom Loading
export const setChatroomLoading = (value) => async (dispatch) => {
  dispatch({
    type: ADMIN_CHATROOM_LOADING,
    payload: value,
  });
};

// * Clear
export const clear = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ADMIN_ERROR,
  });
};

// * Set unread messages to 0
export const clearUnreadMessages = (id) => async (dispatch) => {
  const storeState = store.getState();
  const newChatrooms = storeState.admin.chatrooms.map((item) => {
    if (item._id === id) {
      const newItem = { ...item, unreadMessages: 0 };
      return newItem;
    } else {
      return item;
    }
  });
  dispatch({
    type: CLEAR_UNREAD_MESSAGES_ADMIN,
    payload: newChatrooms,
  });
};

// * Set unread messages to 0 of active chatroom
export const clearUnreadMessagesActive = () => async (dispatch) => {
  const storeState = store.getState();
  const activeChatroom = {
    ...storeState.admin.active_chatroom,
    unreadMessages: 0,
  };
  dispatch({
    type: CLEAR_UNREAD_MESSAGES_ACTIVE_ADMIN,
    payload: activeChatroom,
  });
};

// * Set active chatroom to null
export const clearActiveChatroom = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ADMIN_ACTIVE_CHATROOM,
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
      type: ADD_QUESTION_TO_QUESTION_SET,
      payload: res.data.body,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};

// * Get questionSet
export const getQuestionSet = (chatroomId) => async (dispatch) => {
  try {
    const res = await axios.get(`/questionSet/doctor/get/${chatroomId}`);
    dispatch({
      type: GET_ADMIN_QUESTION_SET,
      payload: res.data.body,
    });
  } catch (error) {
    if (error.response.data.error === "Invalid Question Set.") {
      Swal.fire({
        title: "Error",
        text: "No question set found for this chatroom.",
        icon: "error",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Create Question Set",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(`/questionSet/new`, {
              chatroomId,
            })
            .then((res) => {
              Swal.fire({
                title: res.data.body,
                icon: "success",
              });
              dispatch({
                type: CLEAR_ADMIN_ERROR,
              });
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: err.response.data.error,
              });
            });
        }
      });
    }
    dispatch({
      type: ADMIN_ERROR,
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
    const questions = storeState.admin.questionSet.questions.filter(
      (question) =>
        question._id.toString().trim() !== questionId.toString().trim()
    );

    axios
      .put(`/questionSet/removeQuestion/${chatroomId}`, {
        questionId,
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Sucess",
          text: "Deleted Successfully",
          icon: "success",
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.response.data.error,
          icon: "error",
          showConfirmButton: true,
        });
      });
    dispatch({
      type: REMOVE_QUESTION_TO_QUESTION_SET,
      payload: { message: "Question removed successfully.", questions },
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response.data.error,
    });
  }
};
