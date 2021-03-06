import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const RouteWrapper = ({
  component: Component,
  adminLogin,
  doctorLogin,
  userComplete,
  ...rest
}) => {
  const adminState = useSelector((state) => state.admin);
  const doctorState = useSelector((state) => state.doctor);
  const userState = useSelector((state) => state.user);

  if (adminLogin && !adminState.loading && !adminState.isAuthenticated) {
    return <Redirect to="/admin/login" />;
  } else if (
    doctorLogin &&
    !doctorState.loading &&
    !doctorState.isAuthenticated
  ) {
    return <Redirect to="/doctor/login" />;
  } else if (
    userComplete &&
    !userState.loading &&
    !userState.isAuthenticated &&
    !userState.user &&
    !userState.user?.complete
  ) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
