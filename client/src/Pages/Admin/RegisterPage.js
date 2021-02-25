import React from "react";
import AdminAppbar from "../../Components/Common/Appbar";
import Register from "../../Components/Admin/Register";
import AdminLayout from "../../layout/AdminLayout";

const RegisterPage = () => {
  return (
    <>
      <AdminAppbar type={"admin"}>
        <AdminLayout>
          <Register />
        </AdminLayout>
      </AdminAppbar>
    </>
  );
};

export default RegisterPage;
