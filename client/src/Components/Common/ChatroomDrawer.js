import React, { useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Profile from "../../assets/user.svg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpandLess } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "block",
    height: "100px",
    width: "100px",
    objectFit: "cover",
    maxWidth: "100%",
    margin: "auto",
    borderRadius: "50%",
  },
  btn: {
    border: "2px solid #0FC1A7",
    padding: "0.5rem",
    color: "#0FC1A7",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    fontSize: "1rem",
    fontFamily: "sans-serif",
    transition: "ease-out 0.5s",
    "&:before": {
      width: "0%",
      height: "100%",
      top: "0",
      left: "0",
    },
    "&:hover": {
      boxShadow: "inset 400px 0 0 0 #0FC1A7",
      color: "#fff",
    },
  },
}));

const ChatroomDrawer = ({ type }) => {
  const classes = useStyles();
  const history = useHistory();
  const { active_chatroom } = useSelector((state) => {
    if (type.trim() === "user") return state.user;
    else if (type.trim() === "doctor") return state.doctor;
  });
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          {type.trim() === "user" ? (
            <img
              src={
                active_chatroom.partner.id.profilePicture
                  ? active_chatroom.partner.id.profilePicture
                  : Profile
              }
              alt={active_chatroom.partner.id.username}
              className={classes.profile}
            />
          ) : (
            <img
              src={
                active_chatroom.user.id.profilePicture
                  ? active_chatroom.user.id.profilePicture
                  : Profile
              }
              alt={active_chatroom.user.id.username}
              className={classes.profile}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              placeItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" align="center">
              {type.trim() === "user"
                ? active_chatroom.partner.id.username
                : active_chatroom.user.id.username}
            </Typography>
            {active_chatroom.partner.id.description ? (
              <IconButton size="small" onClick={() => handleShow()}>
                {show ? (
                  <ExpandLess fontSize="small" />
                ) : (
                  <ExpandMoreIcon fontSize="small" />
                )}
              </IconButton>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            {type.trim() === "user"
              ? active_chatroom.partner.id.email
              : active_chatroom.user.id.email}
          </Typography>
        </Grid>
        {show ? (
          <Grid item xs={12} style={{ padding: "2px 5px 2px 5px" }}>
            <br />
            {type.trim() === "user" ? (
              <Typography variant="body1">
                {active_chatroom.partner.id.description || "No description"}
              </Typography>
            ) : (
              <Typography variant="body1">
                {active_chatroom.user.id.description || "No description"}
              </Typography>
            )}
          </Grid>
        ) : null}
        {type.trim() === "user" ? (
          <>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <br />
              <Button
                className={classes.btn}
                disabled={active_chatroom.partner.id.role !== "doctor"}
                onClick={() => {
                  history.push(`/book-call/${active_chatroom._id}`);
                }}
              >
                Book a Session
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <br />
              <Button
                className={classes.btn}
                disabled={active_chatroom.partner.id.role !== "doctor"}
                onClick={() => {
                  history.push(`/question-bank/${active_chatroom._id}`);
                }}
              >
                Evaluate
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <br />
              <Button
                className={classes.btn}
                disabled={active_chatroom.partner.id.role !== "doctor"}
                onClick={() => {
                  history.push(`/doctor/call-history/${active_chatroom._id}`);
                }}
              >
                View Calls
              </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <br />
              <Button
                className={classes.btn}
                disabled={active_chatroom.partner.id.role !== "doctor"}
                onClick={() => {
                  history.push(`/doctor/question-bank/${active_chatroom._id}`);
                }}
              >
                View Responses
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default ChatroomDrawer;
