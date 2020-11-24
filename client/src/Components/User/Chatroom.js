import React, { useEffect } from "react";
import { Box, makeStyles, Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
}));

const Chatroom = () => {
  const classes = useStyles();
  const { loading, active_chatroom } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Loaded Chatroom");
  }, []);

  const render = () => {
    if (!loading && !active_chatroom) {
      return <h1>No Selected Chatroom</h1>;
    }
    if (!loading && active_chatroom) {
      return (
        <>
          <MessageList />
        </>
      );
    }
    if (loading && !active_chatroom) {
      return (
        <>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.container}
          >
            <Grid item xs={3}>
              <CircularProgress />
            </Grid>
          </Grid>
        </>
      );
    }
  };

  return <>{render()}</>;
};

export default Chatroom;
