import React from "react";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

const AdminChatroomDrawer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { admin_messages } = useSelector((state) => state.admin);

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <br />
          <Button
            className={classes.btn}
            onClick={() => {
              history.push(
                `/admin/question-bank/${admin_messages[0].chatroomId}`
              );
            }}
          >
            View Questions
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminChatroomDrawer;
