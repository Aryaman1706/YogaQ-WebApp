import React, { useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { useSelector } from "react-redux";

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
}));

const ChatroomDrawer = () => {
  const classes = useStyles();
  const { active_chatroom } = useSelector((state) => state.user);
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
          <img
            src={active_chatroom.partner.id.profilePicture}
            alt={active_chatroom.partner.id.username}
            className={classes.profile}
          />
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
              {active_chatroom.partner.id.username}
            </Typography>
            {active_chatroom.partner.id.description ? (
              <IconButton size="small" onClick={() => handleShow()}>
                {show ? (
                  <ArrowBackIos fontSize="small" />
                ) : (
                  <ArrowForwardIos fontSize="small" />
                )}
              </IconButton>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" align="center">
            {active_chatroom.partner.id.email}
          </Typography>
        </Grid>
        {show ? (
          <Grid item xs={12} style={{ padding: "2px 5px 2px 5px" }}>
            <br />
            <Typography variant="body1">
              {active_chatroom.partner.id.description || null}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <br />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={active_chatroom.partner.id.role !== "doctor"}
          >
            Book a Session
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatroomDrawer;
