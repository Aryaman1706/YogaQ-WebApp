import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
  Paper,
  IconButton,
  Divider,
  ButtonGroup,
} from "@material-ui/core";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";
import useCallPagination from "../../hooks/useCallPagination";

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
    margin: "1rem 0",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.16s ease-in 0s",
      cursor: "pointer",
    },
  },
}));

const PaginatedCalls = ({ doctorId }) => {
  const classes = useStyles();
  const [compLoading, setCompLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const [callFilter, setCallFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [pagination, setPagination] = useState({
    loadedPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0,
    list: [],
    end: false,
  });
  const [
    loadFunction,
    fetchMore,
    nextHandler,
    prevHandler,
    isLoaded,
  ] = useCallPagination(
    doctorId,
    pagination,
    setPagination,
    callFilter,
    setCallFilter,
    setCompLoading
  );
  const dateHandler = (e) => {
    setCallFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = () => {
    setLoadMore(false);
    if (callFilter.startDate && callFilter.endDate) {
      setPagination((prev) => {
        return { ...prev, list: [] };
      });
      setCompLoading(true);
    }
  };

  useEffect(() => {
    if (compLoading && loadMore === false) {
      loadFunction();
    } else if (compLoading && loadMore === true) {
      fetchMore();
    }
    // eslint-disable-next-line
  }, [compLoading, loadMore]);

  useEffect(() => {
    if (isLoaded) {
      setCompLoading(false);
    }
  }, [pagination.loadedPages, isLoaded]);

  // ****Render Chatroom*****//
  const renderChatrooms = () => {
    if (
      !pagination[`list${pagination.currentPage}`] ||
      pagination[`list${pagination.currentPage}`]?.length === 0 ||
      pagination[`list${pagination.currentPage}`][0] === undefined
    ) {
      return <div>No Available Calls</div>;
    } else if (
      pagination[`list${pagination.currentPage}`] &&
      pagination[`list${pagination.currentPage}`].length > 0
    ) {
      return (
        <>
          {pagination[`list${pagination.currentPage}`]?.map((chatroom) => (
            <ChatroomItem chatroom={chatroom} />
          ))}
        </>
      );
    } else return <div>No Available Calls</div>;
  };
  // **** *****//

  // *****Chatroom Item*******//
  const ChatroomItem = ({ chatroom }) => {
    const renderCalls = () => {
      return (
        <>
          {chatroom.calls.map((call) => (
            <CallItem call={call} />
          ))}
        </>
      );
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
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <IconButton color="primary">
                  <VisibilityIcon />
                </IconButton>
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
  // ***** *******//

  // ****Call Item*****//
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
  // **** *****//

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

            <Grid item xs={12} style={{ marginTop: "1rem" }}>
              {renderChatrooms()}
            </Grid>
            {pagination.currentPage !== 0 && (
              <ButtonGroup variant="contained" color="primary" fullWidth>
                {pagination.currentPage !== 1 ? (
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
                {pagination.end &&
                pagination.currentPage === pagination.loadedPages ? null : (
                  <Button
                    endIcon={<ArrowForwardIos />}
                    onClick={(event) => {
                      setLoadMore(true);
                      nextHandler(event);
                    }}
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
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PaginatedCalls;
