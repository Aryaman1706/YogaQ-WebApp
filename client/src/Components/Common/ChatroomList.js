import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  admin as adminActions,
  user as userActions,
  doctor as doctorActions,
} from "../../redux/actions/index";
import homeIcon from "../../assets/home.svg";
import ChatroomItem from "./ChatroomItem";

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

const ChatroomList = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const { chatrooms } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "user") return state.user;
    else if (type.trim() === "doctor") return state.doctor;
  });
  const dispatch = useDispatch();
  const [compLoading, setCompLoading] = useState(false);

  const start = async () => {
    if (type.trim() === "admin") {
      await dispatch(adminActions.listChatrooms());
    } else if (type.trim() === "user") {
      await dispatch(userActions.listChatrooms());
    } else if (type.trim() === "doctor") {
      // !
    }

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
        {type.trim() === "admin" ? (
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
        ) : null}
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
                <ChatroomItem type={type.trim()} chatroom={item} key={index} />
              ))}
            </>
          ) : null}
        </Grid>
        {type.trim() === "user" ? (
          <>
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
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default ChatroomList;
