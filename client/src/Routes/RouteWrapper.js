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

  if (adminLogin && !adminState.isAuthenticated) {
    return <Redirect to="/admin/login" />;
  }

  if (doctorLogin && !doctorState.isAuthenticated) {
    return <Redirect to="/doctor/login" />;
  }

  if (
    userComplete &&
    !userState.isAuthenticated &&
    !userState.user &&
    !userState.user.complete
  ) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} component={Component} />;
};

export default RouteWrapper;
