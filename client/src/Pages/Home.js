import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ChatroomList from "../Components/User/ChatroomList";
import Chatroom from "../Components/User/Chatroom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={3}
        className={classes.container}
      >
        <Grid item xs={2}>
          <ChatroomList />
        </Grid>
        <Grid item xs={10}>
          <Chatroom />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
