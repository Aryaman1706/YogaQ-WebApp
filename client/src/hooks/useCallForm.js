import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../utils/axios";

const useCallForm = (callData) => {
  const [, setError] = useState(false);
  const history = useHistory();
  const { date, chatroomId, callId } = callData;
  const newDate = new Date(date);
  const currentDate = new Date();

  const validate = () => {
    if (newDate <= currentDate.setDate(currentDate.getDate() + 1)) {
      setError(true);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Invalid Date and Time",
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          setError(false);
        },
      });
    } else {
      submit();
    }
  };

  const validateEdit = () => {
    if (newDate <= currentDate.setDate(currentDate.getDate() + 1)) {
      setError(true);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: "Invalid Date and Time",
        showConfirmButton: true,
        timer: 1500,
        willClose: () => {
          setError(false);
        },
      });
    } else {
      submitEditRequest();
    }
  };

  const submit = async () => {
    try {
      const formData = {
        chatroomId,
        time: newDate,
      };
      await axios.post("/call/request", formData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: "Booking Successful!",
        showConfirmButton: true,
        willClose: () => {
          history.push("/");
        },
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const submitEditRequest = async () => {
    try {
      const formData = {
        time: newDate,
      };
      await axios.put(`/call/edit/${callId}`, formData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success!",
        text: "Edit Booking Successful!",
        showConfirmButton: true,
        willClose: () => {
          history.push("/");
        },
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return [validate, validateEdit];
};

export default useCallForm;
