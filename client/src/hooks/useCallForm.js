import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../utils/axios";

const useCallForm = (callData) => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const { date, chatroomId } = callData;
  const newDate = new Date(date);

  const validate = () => {
    if (newDate === new Date(Date.now())) {
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
    } else if (newDate <= new Date(Date.now())) {
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

  const submit = async () => {
    const formData = {
      chatroomId,
      time: newDate,
    };
    const res = await axios.post("/call/request", formData);

    if (res.status === 200) {
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
    }
    if (res.status !== 200) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error!",
        text: `${res.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return [validate];
};

export default useCallForm;
