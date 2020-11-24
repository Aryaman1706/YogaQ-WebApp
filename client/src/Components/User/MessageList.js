import React, { useState, useEffect, useRef, Fragment } from "react";
import { TextField, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  parent: {
    bottom: "5px",
    position: "sticky",
    width: "100%",
  },
  test: {
    height: "calc(100% - 65px)",
    overflow: "auto",
    "&>div": {
      height: "100%",
    },
  },
}));

const MessageList = () => {
  const classes = useStyles();
  const {
    user_messages,
    message_end,
    active_chatroom,
    user,
    error,
    chatroomLoading,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const ref = useRef(null);

  const loadMore = async () => {
    await dispatch(userActions.getMessages({ id: active_chatroom._id, page }));
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(
        userActions.modfiyLastAccess({
          id: active_chatroom._id,
          formData: { lastAccess: new Date() },
        })
      );
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user_messages.length === 5) {
      ref.current && ref.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line
  }, [user_messages]);

  const loadChatroom = async () => {
    await dispatch(userActions.setChatroomLoading(true));
    await dispatch(userActions.getChatroom(active_chatroom._id));
    await dispatch(userActions.setChatroomLoading(false));
  };

  useEffect(() => {
    if (/Get chatroom first*/i.test(error)) {
      loadChatroom();
    }
    // eslint-disable-next-line
  }, [error]);

  const nextHandler = () => {
    setPage((prev) => {
      return prev + 1;
    });
  };

  return (
    <>
      {chatroomLoading ? (
        <Loader />
      ) : (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={1}
          style={{ height: "100%" }}
        >
          <Grid item className={classes.test}>
            <InfiniteScroll
              dataLength={1}
              next={nextHandler}
              hasMore={!message_end}
              // loader={<h2>Loading...</h2>}
              // endMessage={<h2>No more Messages</h2>}
              height="100%"
              inverse
            >
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="stretch"
                style={{ height: "100%" }}
              >
                {user_messages.length > 0 &&
                  user_messages.reverse().map((item) => {
                    return <MessageItem message={item} id={user._id} />;
                  })}
              </Grid>
            </InfiniteScroll>
          </Grid>
          <Grid
            item
            style={{ position: "sticky", bottom: "0px", width: "100%" }}
            ref={ref}
          >
            <Grid container>
              <Grid item xs={10}>
                <TextField fullWidth variant="filled" />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MessageList;
