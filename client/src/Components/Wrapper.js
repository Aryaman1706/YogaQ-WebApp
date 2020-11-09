import React from "react";
import { useHistory } from "react-router-dom";
import AdminAppbar from "./Admin/Appbar";

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
    }
    if (/\/doctor.+/.test(x)) {
      return (
        <>
          <h1>Doctor Appbar</h1>
        </>
      );
    }
  };
  return <>{render()}</>;
};

export default Wrapper;
