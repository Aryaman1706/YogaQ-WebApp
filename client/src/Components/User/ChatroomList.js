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
  videoContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    overflowX: "auto",
  },
  img: {
    height: "150px",
    width: "215px",
    borderRadius: "10px",
    margin: "1rem",
    cursor: "pointer",
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
        <Grid item xs={12}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Helpful Tips
          </span>
        </Grid>
        <Grid item xs={12} className={classes.videoContainer}>
          <img
            src={"https://picsum.photos/200"}
            alt="video"
            className={classes.img}
            onClick={() => {
              window.open("https://youtube.com/");
            }}
          />
          <img
            src={"https://picsum.photos/200"}
            alt="video"
            className={classes.img}
          />
          <img
            src={"https://picsum.photos/200"}
            alt="video"
            className={classes.img}
          />
          <img
            src={"https://picsum.photos/200"}
            alt="video"
            className={classes.img}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ChatroomList;
