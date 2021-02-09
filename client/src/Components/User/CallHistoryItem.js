import React from "react";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "15px 10px 15px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 16px 0px",
    borderRadius: "3px",
    transition: "all 0.16s ease-in 0s",
    "&:hover": {
      transform: "translate3d(0, -5px, 10px)",
      cursor: "pointer",
    },
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
}));

const CallHistoryItem = ({ item }) => {
  const classes = useStyles();
  const history = useHistory();

  const renderStatus = () => {
    if (item.accepted) {
      return (
        <>
          <CheckCircleIcon style={{ color: "blue", margin: "auto" }} />
          <Typography variant="h6">Accepted</Typography>
        </>
      );
    } else if (item.completed) {
      return (
        <>
          <CheckCircleIcon style={{ color: "green", margin: "auto" }} />
          <Typography variant="h6">Completed</Typography>
        </>
      );
    } else {
      return (
        <>
          <ErrorIcon style={{ color: "#e3eb0c", margin: "auto" }} />
          <Typography variant="h6">Pending</Typography>
        </>
      );
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={6} className={classes.paper}>
          <div className={classes.flexCol}>
            <Typography variant="h6">
              {format(new Date(item.time), "dd MMM yyyy")}
            </Typography>
            <Typography variant="h6">
              {format(new Date(item.time), "hh:mm aaa")}
            </Typography>
          </div>
          <div className={classes.flexCol}>{renderStatus()}</div>
        </Paper>
      </Grid>
    </>
  );
};

export default CallHistoryItem;
