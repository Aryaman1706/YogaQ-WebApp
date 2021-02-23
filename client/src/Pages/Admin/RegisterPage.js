import React from "react";
import AdminAppbar from "../../Components/Common/Appbar";
import Register from "../../Components/Admin/Register";

const RegisterPage = () => {
  return (
    <>
      <AdminAppbar type={"admin"}>
        <Register />
      </AdminAppbar>
    </>
  );
};

export default RegisterPage;
