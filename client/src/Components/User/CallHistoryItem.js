import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import EditIcon from "@material-ui/icons/Edit";
import EditCallModal from "./EditCallModal";
import { chatroom } from "../../redux/actions";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import DoneAllIcon from "@material-ui/icons/DoneAll";

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
  flexGrowCls: {
    flexGrow: 2,
  },
}));

const CallHistoryItem = ({ item, chatroomId, type }) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

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
          <div className={`${classes.flexCol} ${classes.flexGrowCls}`}>
            <Typography variant="h6">
              {format(new Date(item.time), "dd MMM yyyy")}
            </Typography>
            <Typography variant="h6">
              {format(new Date(item.time), "hh:mm aaa")}
            </Typography>
          </div>
          {type === "doctor" && !item.accepted && !item.completed && (
            <>
              <div className={classes.flexCol}>
                <Tooltip title="Accept Call">
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className={classes.flexCol}>
                <Tooltip title="Reject Call">
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
          {type === "doctor" && item.accepted && !item.completed && (
            <>
              <div className={classes.flexCol}>
                <Tooltip title="Mark as completed">
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <DoneAllIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
          {!type && !item.accepted && !item.completed && (
            <div className={classes.flexCol}>
              <Tooltip title="Edit Call">
                <IconButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
          <div className={classes.flexCol}>{renderStatus()}</div>
        </Paper>
      </Grid>
      <EditCallModal
        open={open}
        setOpen={setOpen}
        chatroomId={chatroomId}
        date={format(new Date(item.time), "yyyy-MM-dd'T'kk:mm")}
        callId={item._id}
      />
    </>
  );
};

export default CallHistoryItem;
