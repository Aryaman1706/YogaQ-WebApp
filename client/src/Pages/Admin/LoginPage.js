import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Login from "../../Components/Admin/Login";
import AdminAppbar from "../../Components/Admin/AdminAppbar";

const LoginPage = () => {
  const { admin, isAuthenticated } = useSelector((state) => state.admin);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && admin) {
      history.push("/admin");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, admin]);
  return (
    <>
      <AdminAppbar>
        <Login />
      </AdminAppbar>
    </>
  );
};

export default LoginPage;
