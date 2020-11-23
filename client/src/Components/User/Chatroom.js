import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "10px 15px 10px 15px",
  },
}));

const Chatroom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, active_chatroom, user_messages, message_end } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log("Loaded Chatroom");
  }, []);

  const render = () => {
    if (!loading && !active_chatroom) {
      return <h1>No Selected Chatroom</h1>;
    }
    if (!loading && active_chatroom) {
      return <h1>Open Chatroom is {active_chatroom._id}</h1>;
    }
    if (loading) {
      return <h1>Loading...</h1>;
    }
  };

  return (
    <>
      <div className={classes.container}>{render()}</div>
    </>
  );
};

export default Chatroom;
