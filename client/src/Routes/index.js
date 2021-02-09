import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import Wrapper from "../Components/Wrapper";

// * Admin
import AdminLogin from "../Pages/Admin/LoginPage";
import AdminHome from "../Pages/Admin/Home";
import AdminProfile from "../Pages/Admin/Profile";

// * Admin DashBoard
import AdminRegisterPage from "../Pages/Admin/RegisterPage";
import EnquiryList from "../Components/Admin/Dashboard/EnquiryList";
import ViewEnquiry from "../Components/Admin/Dashboard/ViewEnquiry";
import RegisterEnquiry from "../Components/Admin/Dashboard/RegisterEnquiry";
import DoctorList from "../Components/Admin/Dashboard/DoctorList";
import ViewDoctor from "../Components/Admin/Dashboard/ViewDoctor";
import UserList from "../Components/Admin/Dashboard/UserList";
import ViewUser from "../Components/Admin/Dashboard/ViewUser";
import CreateChatroom from "../Components/Admin/Dashboard/CreateChatroom";

// * Enquiry
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";

// * Doctor
import DoctorLogin from "../Pages/Doctor/LoginPage";

// * Doctor Dashboard

// * User
import Home from "../Pages/Home";
import Room from "../Pages/Room";
import Signup from "../Pages/Signup";
import EditUser from "../Components/User/Edit";
import Chat from "../Components/User/Chat";
import BookCall from "../Components/User/BookCall";
import CallHistory from "../Components/User/CallHistory";

const Routes = () => {
  return (
    <>
      <Wrapper />
      <Switch>
        {/* Admin */}
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route adminLogin exact path="/admin" component={AdminHome} />
        <Route
          adminLogin
          exact
          path="/admin/profile"
          component={AdminProfile}
        />

        {/* Admin Dashboard */}
        <Route
          adminLogin
          exact
          path="/admin/register"
          component={AdminRegisterPage}
        />
        <Route
          adminLogin
          exact
          path="/admin/enquiries"
          component={EnquiryList}
        />
        <Route
          adminLogin
          exact
          path="/admin/enquiry/:id"
          component={ViewEnquiry}
        />
        <Route
          adminLogin
          exact
          path="/admin/accept/enquiry"
          component={RegisterEnquiry}
        />
        <Route adminLogin exact path="/admin/doctors" component={DoctorList} />
        <Route
          adminLogin
          exact
          path="/admin/doctor/:id"
          component={ViewDoctor}
        />
        <Route adminLogin exact path="/admin/users" component={UserList} />
        <Route adminLogin exact path="/admin/user/:id" component={ViewUser} />
        <Route
          adminLogin
          exact
          path="/admin/chatroom/create"
          component={CreateChatroom}
        />

        {/* Doctor */}
        <Route exact path="/enquire" component={NewEnquiry} />
        <Route exact path="/doctor/login" component={DoctorLogin} />

        {/* Doctor Dashboard */}

        {/* User */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route userComplete exact path="/edit" component={EditUser} />
        <Route exact path="/chat/:id" component={Chat} />
        <Route exact path="/room" component={Room} />
        <Route exact path="/book-call/:chatroomId" component={BookCall} />
        <Route exact path="/call-history/:chatroomId" component={CallHistory} />
      </Switch>
    </>
  );
};

export default Routes;
