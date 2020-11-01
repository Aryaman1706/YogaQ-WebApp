import React from "react";
import { Grid, makeStyles, TextField } from "@material-ui/core";
import ChatAreaBar from "./Appbar/ChatAreaBar";

const useStyles = makeStyles((theme) => ({
  item: {},
  chats: {
    height: "calc(100vh - 106px)",
    overflow: "auto",
  },
  chatbox: {
    position: "fixed",
    bottom: "0",
    width: "calc(100% - (100%)/6)",
    zIndex: 100,
  },
}));

const ChatArea = () => {
  const classes = useStyles();
  let arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i);
  }
  return (
    <Grid item xs={10} className={classes.item}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <ChatAreaBar />
        <Grid item className={classes.chats}>
          {arr.map((i) => {
            return <p>{i}</p>;
          })}
        </Grid>
        <Grid item className={classes.chatbox}>
          <TextField variant="outlined" fullWidth label="Message" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatArea;
