import React from "react";
import { Switch } from "react-router-dom";
import Route from "./RouteWrapper";
import Wrapper from "../Components/Wrapper";

// * Common Components
import Home from "../Pages/Common/Home";
import Login from "../Components/Common/Login";

// * Admin
import AdminLogin from "../Pages/Admin/LoginPage";
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
import ViewChatroom from "../Components/Admin/Dashboard/ViewChatroom";
import AddQuestion from "../Components/Admin/Dashboard/AddQuestion";
import QuestionBankAdminDoctor from "../Components/Common/QuestionBank";

// * Enquiry
import NewEnquiry from "../Components/Doctor/Enquiry/NewEnquiry";

// * Doctor
import DoctorLogin from "../Pages/Doctor/LoginPage";

// * Doctor Dashboard
import CallListing from "../Pages/Doctor/CallListing";

// * User
// import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import EditUser from "../Components/User/Edit";
import BookCall from "../Components/User/BookCall";
import CallHistory from "../Components/User/CallHistory";
import QuestionBank from "../Components/User/QuestionBank";
import UserAppbar from "../Components/Common/Appbar";

const Routes = () => {
  return (
    <>
      <Wrapper />
      <Switch>
        {/* Admin */}
        <Route
          exact
          path="/admin/login"
          render={(props) => <Login type={"admin"} />}
        />
        <Route
          adminLogin
          exact
          path="/admin"
          render={(props) => (
            <>
              <Home type="admin" />
            </>
          )}
        />
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
        <Route
          adminLogin
          exact
          path="/admin/chatroom/view/:chatroomId"
          component={ViewChatroom}
        />
        <Route
          adminLogin
          exact
          path="/admin/add-question/:chatroomId"
          component={AddQuestion}
        />
        <Route
          exact
          path="/admin/question-bank/:chatroomId"
          render={(props) => (
            <QuestionBankAdminDoctor type="admin" {...props} />
          )}
        />

        {/* Doctor */}
        <Route
          doctorLogin
          exact
          path="/doctor"
          render={(props) => <Home type="doctor" {...props} />}
        />
        <Route exact path="/enquire" component={NewEnquiry} />
        <Route
          exact
          path="/doctor/login"
          render={(props) => <Login type={"doctor"} />}
        />
        <Route
          exact
          path="/doctor/question-bank/:chatroomId"
          render={(props) => (
            <QuestionBankAdminDoctor type="doctor" {...props} />
          )}
        />

        {/* Doctor Dashboard */}
        <Route exact path="/doctor/calls" component={CallListing} />

        {/* User */}
        <Route
          exact
          path="/"
          render={(props) => (
            <>
              <Home type="user" {...props} />
            </>
          )}
        />
        <Route exact path="/signup" component={Signup} />
        <Route userComplete exact path="/edit" component={EditUser} />
        <Route
          userComplete
          exact
          path="/book-call/:chatroomId"
          component={BookCall}
        />
        <Route
          userComplete
          exact
          path="/call-history/:chatroomId"
          component={CallHistory}
        />
        <Route
          exact
          path="/question-bank/:chatroomId"
          render={(props) => (
            <>
              <UserAppbar type={"user"}>
                <QuestionBank {...props} />
              </UserAppbar>
            </>
          )}
        />
      </Switch>
    </>
  );
};

export default Routes;
