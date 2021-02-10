import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminAppbar from "./Admin/Appbar";
import DoctorAppbar from "./Doctor/Appbar";
import UserAppbar from "./User/Appbar";

const Wrapper = () => {
  const history = useHistory();
  const [x] = useState(history.location.pathname);

  useEffect(() => {
    console.log(x);
  }, [x]);

  const render = () => {
    if (/\/admin*/.test(x)) {
      return (
        <>
          <AdminAppbar />
        </>
      );
    } else if (/\/doctor*/.test(x)) {
      return (
        <>
          <DoctorAppbar />
        </>
      );
    } else {
      return (
        <>
          <UserAppbar />
        </>
      );
    }
  };
  return <>{render()}</>;
};

export default Wrapper;
