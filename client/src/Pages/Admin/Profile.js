import React from "react";
import Edit from "../../Components/Admin/Edit";
import ChangePassword from "../../Components/Admin/ChangePassword";
import { Toolbar } from "@material-ui/core";

const Profile = () => {
  return (
    <>
      <Edit />
      <Toolbar />
      <ChangePassword />
    </>
  );
};

export default Profile;
