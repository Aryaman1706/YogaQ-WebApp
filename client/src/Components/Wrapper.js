import React from "react";
import { useHistory } from "react-router-dom";
import AdminAppbar from "./Admin/Appbar";
import DoctorAppbar from "./Doctor/Appbar";

const Wrapper = () => {
  const history = useHistory();
  const render = () => {
    const x = history.location.pathname;
    console.log("Wrapper", history.location.pathname);
    if (/\/admin.+/.test(x)) {
      return (
        <>
          <AdminAppbar />
        </>
      );
    } else if (/\/doctor.+/.test(x)) {
      return (
        <>
          <DoctorAppbar />
        </>
      );
    } else {
      return (
        <>
          <h1>Unknown Appbar</h1>
        </>
      );
    }
  };
  return <>{render()}</>;
};

export default Wrapper;
