import React, { useState, Fragment } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import axios from "../../utils/axios";

const useStyles = makeStyles((theme) => ({}));

const ListCallsDoctor = ({ doctorId }) => {
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
        <div>
          <h4>Chatroom Details:-</h4>
          <h4>User Name:- {chatroom.partner.username}</h4>
          <h4>User Email:- {chatroom.partner.email}</h4>
          <br />
          <div>
            <h5>Calls</h5>
            {renderCalls()}
          </div>
        </div>
      </>
    );
  };

  const CallItem = ({ call }) => {
    return (
      <>
        <h5>Time:- {new Date(call.time).toLocaleDateString()}</h5>
        <h5>Accepted:- {Boolean(call?.accepted).toString()}</h5>
        <h5>Completed:- {Boolean(call?.completed).toString()}</h5>
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
