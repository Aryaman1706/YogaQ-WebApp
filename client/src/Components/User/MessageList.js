import React, { useState, useEffect, useRef, Fragment } from "react";
import { Box, TextField, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import Linkify from "react-linkify";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  parent: {
    bottom: "5px",
    position: "sticky",
    width: "100%",
  },
}));

const MessageList = () => {
  const classes = useStyles();
  const { user_messages, message_end, active_chatroom } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const loadMore = async () => {
    // await dispatch(userActions.setLoading(true));
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
  const nextHandler = () => {
    console.log("Next");
    setPage((prev) => {
      return prev + 1;
    });
  };
  const ref = useRef(null);

  return (
    <>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
        style={{ height: "100%" }}
      >
        <Grid item style={{ height: "calc(100% - 65px)", overflow: "auto" }}>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
          <p>Hey</p>
        </Grid>
        <Grid item style={{ position: "sticky", bottom: "0px", width: "100%" }}>
          <Grid container>
            <Grid item xs={10}>
              <TextField fullWidth variant="filled" />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <InfiniteScroll
        dataLength={1}
        next={nextHandler}
        hasMore={!message_end}
        loader={<h2>Loading...</h2>}
        endMessage={<h2>No more Messages</h2>}
        inverse
      >
        {user_messages.length > 0 &&
          user_messages.reverse().map((item) => {
            return <p style={{ height: "80px" }}>{item.text}</p>;
          })}
        <div ref={ref}>
          <h1>See me</h1>
        </div>
      </InfiniteScroll> */}
    </>
  );
};

export default MessageList;
