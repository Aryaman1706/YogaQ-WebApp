import React, { useEffect, useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { admin as adminActions } from "../../redux/actions/index";
import ChatroomItem from "./ChatroomItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
  },
}));

const ChatroomList = () => {
  const classes = useStyles();
  const { chatrooms } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [compLoading, setCompLoading] = useState(false);

  const start = async () => {
    await dispatch(adminActions.listChatrooms());
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
        spacing={4}
        className={classes.container}
      >
        <Grid item>
          <Typography variant="h5" align="left">
            My ChatRooms
          </Typography>
        </Grid>
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
