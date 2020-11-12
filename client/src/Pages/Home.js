import React, { Fragment } from "react";
import { Button } from "@material-ui/core";

const Home = () => {
  return (
    <Fragment>
      <Button
        variant="contained"
        href={`${process.env.REACT_APP_SERVER_URL}/api/user/auth`}
      >
        SignUp with Google
      </Button>
    </Fragment>
  );
};

export default Home;
