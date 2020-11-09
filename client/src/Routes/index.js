import React from "react";
import { Route, Switch } from "react-router-dom";
import Wrapper from "../Components/Wrapper";
import AdminHome from "../Pages/Admin/Home";
import AdminLogin from "../Pages/Admin/LoginPage";
import Profile from "../Pages/Admin/Profile";
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";
import RegisterPage from "../Pages/Admin/RegisterPage";
import DoctorLogin from "../Pages/Doctor/LoginPage";

const Routes = () => {
  return (
    <>
      <Wrapper />
      <Switch>
        {/* Admin */}
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/register" component={RegisterPage} />
        <Route exact path="/admin" component={AdminHome} />
        <Route exact path="/admin/profile" component={Profile} />
        {/* Doctor */}
        <Route exact path="/enquire" component={NewEnquiry} />
        <Route exact path="/doctor/login" component={DoctorLogin} />
      </Switch>
    </>
  );
};

export default Routes;
