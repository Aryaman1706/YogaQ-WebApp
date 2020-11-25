import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/index";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CssBaseline>
            <Router basename="/">
              <Routes />
            </Router>
          </CssBaseline>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
