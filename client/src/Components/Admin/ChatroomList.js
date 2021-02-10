import React, { useEffect, useState } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin as adminActions } from "../../redux/actions/index";
import ChatroomItem from "./ChatroomItem";
import homeIcon from "../../assets/home.svg";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "auto",
  },
  homeIcon: {
    height: "1.5rem",
    width: "auto",
    objectFit: "contain",
    margin: "auto 0 auto 0",
    paddingRight: "0.5rem",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
    padding: "0.5rem",
    "&:hover": {
      backgroundColor: "rgb(211,211,211, 0.4)",
      cursor: "pointer",
      borderRadius: "10px",
      transition: "all 0.2s ease-in-out",
    },
  },
  homeText: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    margin: "auto 0 auto 0",
  },
}));

const ChatroomList = () => {
  const classes = useStyles();
  const history = useHistory();
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
        spacing={2}
        className={classes.container}
      >
        <Grid item xs={12}>
          <div
            className={classes.flexRow}
            onClick={() => {
              history.push("/admin/enquiries");
            }}
          >
            <img src={homeIcon} alt="home" className={classes.homeIcon} />
            <span className={classes.homeText}>Back to home</span>
          </div>
        </Grid>
        <Grid item xs={12}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Rooms</span>
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
      </Grid>
    </>
  );
};

export default ChatroomList;
