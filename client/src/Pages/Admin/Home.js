import React from "react";
import Appbar from "../../Components/Admin/Appbar";
import Login from "../../Components/Admin/Login";
import Edit from "../../Components/Admin/Edit";
import ChangePassword from "../../Components/Admin/ChangePassword";
import NewEnquiry from "../../Components/Doctor/Enquiry/NewEnquiry";

const Home = () => {
  return (
    <>
      <Appbar />
      <Login />
      <Edit />
      <ChangePassword />
      <NewEnquiry />
    </>
  );
};

export default Home;
