import React from "react";
import { Route, Switch } from "react-router-dom";
import Room from "../Pages/Room";
import AdminHome from "../Pages/Admin/Home";
import AdminLogin from "../Pages/Admin/LoginPage";
import RegisterPage from "../Pages/Admin/RegisterPage";
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Room} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/create" component={RegisterPage} />
        <Route exact path="/enquire" component={NewEnquiry} />
      </Switch>
    </>
  );
};

export default Routes;
