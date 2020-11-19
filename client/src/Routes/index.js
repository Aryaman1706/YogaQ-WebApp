import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import Wrapper from "../Components/Wrapper";
import AdminHome from "../Pages/Admin/Home";
import AdminLogin from "../Pages/Admin/LoginPage";
import Profile from "../Pages/Admin/Profile";
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";
import RegisterPage from "../Pages/Admin/RegisterPage";
import DoctorLogin from "../Pages/Doctor/LoginPage";
import EnquiryList from "../Components/Admin/Dashboard/EnquiryList";
import ViewEnquiry from "../Components/Admin/Dashboard/ViewEnquiry";
import RegisterEnquiry from "../Components/Admin/Dashboard/RegisterEnquiry";
import DoctorList from "../Components/Admin/Dashboard/DoctorList";
import ViewDoctor from "../Components/Admin/Dashboard/ViewDoctor";
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import EditUser from "../Components/User/Edit";

const Routes = () => {
  return (
    <>
      <Wrapper />
      <Switch>
        {/* Admin */}
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route
          adminLogin
          exact
          path="/admin/register"
          component={RegisterPage}
        />
        <Route adminLogin exact path="/admin" component={AdminHome} />
        <Route adminLogin exact path="/admin/profile" component={Profile} />
        <Route
          adminLogin
          exact
          path="/admin/enquiries"
          component={EnquiryList}
        />
        <Route adminLogin exact path="/admin/doctors" component={DoctorList} />
        <Route
          adminLogin
          exact
          path="/admin/enquiry/:id"
          component={ViewEnquiry}
        />
        <Route
          adminLogin
          exact
          path="/admin/doctor/:id"
          component={ViewDoctor}
        />
        <Route
          adminLogin
          exact
          path="/admin/accept/enquiry"
          component={RegisterEnquiry}
        />
        {/* Doctor */}
        <Route exact path="/enquire" component={NewEnquiry} />
        <Route exact path="/doctor/login" component={DoctorLogin} />
        {/* User */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route userComplete exact path="/edit" component={EditUser} />
      </Switch>
    </>
  );
};

export default Routes;
