import React from "react";
import Edit from "../../Components/Admin/Edit";
import ChangePassword from "../../Components/Admin/ChangePassword";
import { Toolbar } from "@material-ui/core";
import { useSelector } from "react-redux";
const Profile = () => {
  const { loading } = useSelector((state) => state.admin);
  return (
    <>
      <h1>Edit</h1>
      {loading ? null : (
        <>
          <Edit />
          <Toolbar />
          <ChangePassword />
        </>
      )}
    </>
  );
};

export default Profile;
