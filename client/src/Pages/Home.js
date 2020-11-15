import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { user as userActions } from "../redux/actions/index";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.listChatrooms());
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <h1>Home Page</h1>
    </Fragment>
  );
};

export default Home;
