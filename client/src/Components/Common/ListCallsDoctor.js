import React, { useEffect, useState, Fragment } from "react";
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
import Loader from "./Loader"
import { Visibility as VisibilityIcon } from "@material-ui/icons";
import Swal from "sweetalert2";
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
  const [compLoading, setCompLoading] = useState(false);
  const [pagination, setPagination] = useState({
    loadedPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0,
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

  const submitHandler = () => {
    setCompLoading(true);
  };

  useEffect(() => {
    if (compLoading) {
      loadFunction();
    }
  }, [compLoading]);

  const loadFunction = async () => {
    try {
      const res = await axios.get(
        `/call/doctor/list/${doctorId}/?page=${
          pagination.loadedPages + 1
        }&startDate=${callFilter.startDate}&endDate=${callFilter.endDate}`
      );

      setPagination((prev) => {
        return {
          loadedPages: prev.loadedPages + 1,
          currentPage: prev.currentPage + 1,
          startIndex: prev.currentPage * 5,
          endIndex: (prev.currentPage + 1) * 5,
          list: [...prev.list, res.data.body.list],
          end: res.data.body.end,
        };
      });
    } catch (error) {
      setCallFilter({ startDate: null, endDate: null });
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error Occured.",
        text: `${error.response.data.error}`,
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setCompLoading(false);
  }, [pagination.loadedPages]);

  const nextHandler = () => {
    if (!pagination.end) {
      if (pagination.currentPage === pagination.loadedPages) {
        setCompLoading(true);
      } else {
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage + 1,
            startIndex: prev.currentPage * 5,
            endIndex: (prev.currentPage + 1) * 5,
          };
        });
      }
    } else {
      if (pagination.currentPage !== pagination.loadedPages) {
        setPagination((prev) => {
          return {
            ...prev,
            currentPage: prev.currentPage + 1,
            startIndex: prev.currentPage * 5,
            endIndex: (prev.currentPage + 1) * 5,
          };
        });
      }
  };

  const prevHandler = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
          startIndex: (prev.currentPage - 2) * 5,
          endIndex: (prev.currentPage - 1) * 5,
        };
      });
    }
  }

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
        style={{ marginTop: "1rem" }}
      >
        <Grid item xs={12}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={3}>
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
        <Grid item xs={12} style={{ marginTop: "1rem" }}>
          <>
            <Grid container spacing={1}>
              { compLoading ? <Loader /> : <>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="stretch"
                spacing={2}
                style={{ padding: "1rem" }}
              >
                {list.slice(startIndex, endIndex).map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <ListItem value={item} {...rest} />
                    </Fragment>
                  );
                })}
              </Grid>
              <Toolbar></Toolbar>
              <ButtonGroup variant="contained" color="primary" fullWidth>
                {currentPage !== 1 ? (
                  <Button
                    startIcon={<ArrowBackIos />}
                    onClick={(event) => prevHandler(event)}
                    style={{
                      backgroundColor: "#0FC1A7",
                      height: "50px",
                      backgroundImage:
                        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                    }}
                  >
                    Previous
                  </Button>
                ) : null}
                {end && currentPage === loadedPages ? null : (
                  <Button
                    endIcon={<ArrowForwardIos />}
                    onClick={(event) => nextHandler(event)}
                    style={{
                      backgroundColor: "#0FC1A7",
                      height: "50px",
                      backgroundImage:
                        "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
                    }}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </> }
              {renderChatrooms()}
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default ListCallsDoctor;
