import React from "react";
import { useHistory } from "react-router-dom";
import AdminAppbar from "./Admin/Appbar";

const Wrapper = () => {
  const history = useHistory();
  const render = () => {
    console.log("Wrapper", history.location.pathname);
    return (
      <>
        <AdminAppbar />
      </>
    );
  };
  return <>{render()}</>;
};

export default Wrapper;
