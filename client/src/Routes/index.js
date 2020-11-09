import React from "react";
import { Route, Switch } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import AdminHome from "../Pages/Admin/Home";
import AdminLogin from "../Pages/Admin/LoginPage";
import Profile from "../Pages/Admin/Profile";
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";

const Routes = () => {
  return (
    <>
      <Wrapper />
      <Switch>
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/profile" component={Profile} />
        <Route exact path="/enquire" component={NewEnquiry} />
      </Switch>
    </>
  );
};

export default Routes;
