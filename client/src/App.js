import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Room from "./Pages/Room";

const App = () => {
  return (
    <>
      <CssBaseline>
        <Router>
          <Switch>
            <Route exact path="/" component={Room} />
          </Switch>
        </Router>
      </CssBaseline>
    </>
  );
};

export default App;
