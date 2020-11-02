import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Room from "./Pages/Room";
import AdminHome from "./Pages/Admin/Home";
import RegisterPage from "./Pages/Admin/RegisterPage";

const App = () => {
  return (
    <>
      <CssBaseline>
        <Router>
          <Switch>
            <Route exact path="/" component={Room} />
            <Route exact path="/admin" component={AdminHome} />
            <Route exact path="/admin/create" component={RegisterPage} />
          </Switch>
        </Router>
      </CssBaseline>
    </>
  );
};

export default App;
