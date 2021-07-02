import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  makeStyles,
  ButtonGroup,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { admin as adminActions } from "../../redux/actions";
import useLazyPagination from "../../hooks/useLazyPagination";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

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
    minWidth: "100%",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "all 0.16s ease-in 0s",
      cursor: "pointer",
    },
  },
}));

const ListChatroomDoctor = ({ doctorId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [chatroomFilter, setChatroomFilter] = useState({
    startDate: null,
    endDate: null,
  });
  const [compLoading, setCompLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

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
  ] = useLazyPagination({
    endpoint: "/chatroom/list/",
    doctorId,
    pagination,
    setPagination,
    callFilter: chatroomFilter,
    setCallFilter: setChatroomFilter,
    setCompLoading,
    setLoadMore,
  });
  const [onlyNew, setOnlyNew] = useState(false);
  const [newChatrooms, setNewChatrooms] = useState([]);

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

  const dateHandler = (e) => {
    setChatroomFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onlyNewHandler = (e) => {
    setOnlyNew(e.target.checked);
    filterNewResults(pagination.list);
  };

  const submitHandler = async () => {
    setLoadMore(false);
    if (chatroomFilter.startDate && chatroomFilter.endDate) {
      setPagination((prev) => {
        return { ...prev, list: [] };
      });
      setCompLoading(true);
      setLoadMore(false);
    }
  };
  /**
   * @description returns only the chatrooms that were created between startDate and endDate of the filters
   */
  const filterNewResults = (list) => {
    const onlyNewChatrooms = [];
    list.forEach((chatroom) => {
      if (
        new Date(chatroom.createdAt) >= new Date(chatroomFilter.startDate) &&
        new Date(chatroom.createdAt) <= new Date(chatroomFilter.endDate)
      ) {
        onlyNewChatrooms.push(chatroom);
      }
    });
    setNewChatrooms(onlyNewChatrooms);
  };

  const viewChatroom = async (event, chatroomId) => {
    await dispatch(adminActions.getChatroom(chatroomId));
    history.push(`/admin/chatroom/view/${chatroomId}`);
  };

  const renderChatrooms = () => {
    if (onlyNew) {
      if (!newChatrooms || newChatrooms.length === 0) {
        return <>No available Chatrooms</>;
      } else {
        return newChatrooms.map((chatroom) => (
          <ChatroomItem chatroom={chatroom} />
        ));
      }
    } else {
      if (
        !pagination.list ||
        pagination.list.length === 0 ||
        !pagination.list[pagination.startIndex]
      ) {
        return <>No available Chatrooms</>;
      } else {
        return pagination.list?.map((chatroom, index) => {
          if (index >= pagination.startIndex && index <= pagination.endIndex) {
            return <ChatroomItem chatroom={chatroom} key={index} />;
          }
          return <></>;
        });
      }
    }
  };

  const ChatroomItem = ({ chatroom }) => {
    return (
      <>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            className={classes.paperChatroom}
            onClick={(event) => viewChatroom(event, chatroom._id)}
          >
            <div className={classes.div2}>
              <div>
                <Typography variant="subtitle1">
                  Username:- {chatroom.user.id.username}
                </Typography>
                <Typography variant="subtitle1">
                  Email Address:- {chatroom.user.id.email}
                </Typography>
                <Typography variant="subtitle2">
                  Created On:-{" "}
                  {new Date(chatroom.createdAt).toLocaleDateString()}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Chat Rooms
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
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
                value={chatroomFilter.startDate}
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
                value={chatroomFilter.endDate}
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
            {pagination.list && pagination.list.length > 0 ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={onlyNew}
                      onChange={(event) => onlyNewHandler(event)}
                      name="onlyNew"
                      color="primary"
                    />
                  }
                  label="Only New"
                />
              </Grid>
            ) : null}
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

export default ListChatroomDoctor;
