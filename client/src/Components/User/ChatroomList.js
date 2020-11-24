import React, { useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import ChatroomItem from "./ChatroomItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
  },
}));

const ChatroomList = () => {
  const classes = useStyles();
  const { chatrooms, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const start = async () => {
      await dispatch(userActions.setLoading(true));
      dispatch(userActions.listChatrooms());
    };
    start();
    // eslint-disable-next-line
  }, []);
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
        {!loading ? (
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
