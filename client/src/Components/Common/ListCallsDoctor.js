import React, { useState, Fragment } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({
  div2: {
    padding: "5px 10px 5px 10px",
    display: "flex",
    justifyContent: "space-between",
  },
  paperChatroom: {
    padding: "5px 10px 5px 10px",
    placeItems: "center",
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 16px 0px",
    borderRadius: "3px",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.16s ease-in 0s",
      cursor: "pointer",
    },
  },
}));

const ListCallsDoctor = ({ doctorId }) => {
  const classes = useStyles();
  const [callFilter, setCallFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [calls, setCalls] = useState({
    list: [],
    end: false,
  });

  const dateHandler = (e) => {
    setCallFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async () => {
    try {
      const res = await axios.get(
        `/call/doctor/list/${doctorId}/?page=${1}&startDate=${
          callFilter.startDate
        }&endDate=${callFilter.endDate}`
      );

      console.log(res.data.body);
      setCalls({
        list: res.data.body.calls,
        end: res.data.body.end,
      });
    } catch (error) {
      setCallFilter({ startDate: null, endDate: null });
      console.log(error.response.data);
    }
  };

  const renderChatrooms = () => {
    if (!calls.list || calls.list.length === 0) {
      return <>No Available Calls</>;
    }
    return calls.list.map((chatroom) => <ChatroomItem chatroom={chatroom} />);
  };

  const ChatroomItem = ({ chatroom }) => {
    const renderCalls = () => {
      return chatroom.calls.map((call) => <CallItem call={call} />);
    };
    return (
      <>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paperChatroom}>
            <Grid container>
              <Grid item xs={10}>
                <div>
                  <Typography variant="subtitle1">
                    Username:- {chatroom.partner.username}
                  </Typography>
                  <Typography variant="subtitle1">
                    Email Address:- {chatroom.partner.email}
                  </Typography>
                  {chatroom?.createdAt ? (
                    <Typography variant="subtitle2">
                      Created On:-{" "}
                      {new Date(chatroom?.createdAt).toLocaleDateString()}
                    </Typography>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: "flex", placeItems: "center" }}>
                  <IconButton color="primary">
                    <VisibilityIcon />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <div style={{ display: "flex", placeItems: "center" }}>
                      <Typography variant="subtitle1">Calls:-</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container>{renderCalls()}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </>
    );
  };

  const CallItem = ({ call }) => {
    return (
      <>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">
              Time:- {new Date(call.time).toLocaleDateString()},{" "}
              {new Date(call.time).toLocaleTimeString()}
            </Typography>
            {call.completed ? (
              <>
                <Typography variant="subtitle2">Completed</Typography>
              </>
            ) : (
              <>
                {call.accepted ? (
                  <>
                    <Typography variant="subtitle2">Accepted</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="subtitle2">Pending</Typography>
                  </>
                )}
              </>
            )}
          </div>
        </Grid>
      </>
    );
  };
  return (
    <>
      <Typography variant="h4" align="center">
        Calls
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                name="startDate"
                type="date"
                value={callFilter.startDate}
                onChange={(event) => dateHandler(event)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                name="endDate"
                type="date"
                value={callFilter.endDate}
                onChange={(event) => dateHandler(event)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitHandler}
                style={{
                  backgroundColor: "#0FC1A7",
                  height: "50px",
                  backgroundImage:
                    "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                }}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <>
            <Grid container spacing={1}>
              {renderChatrooms()}
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default ListCallsDoctor;
