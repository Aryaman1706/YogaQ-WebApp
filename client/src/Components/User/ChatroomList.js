import React, { useEffect, useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import ChatroomItem from "./ChatroomItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
    marginTop: "1rem",
  },
}));

const ChatroomList = () => {
  const classes = useStyles();
  const { chatrooms } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [compLoading, setCompLoading] = useState(false);

  const start = async () => {
    await dispatch(userActions.listChatrooms());
    setCompLoading(false);
  };
  useEffect(() => {
    setCompLoading(true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (compLoading) {
      start();
    }
    // eslint-disable-next-line
  }, [compLoading]);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
        className={classes.container}
      >
        <Grid item>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Rooms</span>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
        className={classes.container}
      >
        {!compLoading ? (
          <>
            {chatrooms.map((item, index) => (
              <ChatroomItem chatroom={item} key={index} />
            ))}
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default ChatroomList;
