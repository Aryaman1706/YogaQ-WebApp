import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField, Grid, makeStyles, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { user as userActions } from "../../redux/actions/index";
import MessageItem from "./MessageItem";
import Loader from "../Loader";
import getUrls from "get-urls";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  scrollDiv: {
    height: "calc(100vh - 140px)",
    overflowY: "auto",
  },
}));

const MessageList = () => {
  const classes = useStyles();

  // * Socket Setup
  const ENDPOINT = "http://localhost:5000";
  const socket = useRef();
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", active_chatroom._id);

    socket.current.on("toClient", (message) => {
      dispatch(userActions.appendMessage(message));
    });
    // eslint-disable-next-line
  }, []);

  const {
    user_messages,
    message_end,
    active_chatroom,
    user,
    error,
    chatroomLoading,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [messageLoading, setMessageLoading] = useState(false);
  const [message, setMessage] = useState("");

  const observer = useRef();
  const lastMessage = useRef(null);
  const firstMessage = useCallback(
    (node) => {
      if (messageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !message_end) {
          nextHandler();
        }
      });
      if (node) observer.current.observe(node);
    },
    [messageLoading, message_end]
  );

  // * Load Chatroom if error
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

  // * Clear
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

  // * Scroll to bottom
  useEffect(() => {
    lastMessage.current && lastMessage.current.scrollIntoView();
  }, [user_messages]);

  // * Load More Messages
  const nextHandler = () => {
    console.log("next");
    setMessageLoading(true);
  };

  useEffect(() => {
    if (messageLoading) {
      setPage((prev) => prev + 1);
    }
    // eslint-disable-next-line
  }, [messageLoading]);

  const loadMore = async () => {
    if (page > 0) {
      await dispatch(
        userActions.getMessages({ id: active_chatroom._id, page })
      );
      setMessageLoading(false);
    }
  };

  useEffect(() => {
    if (!message_end) {
      loadMore();
    }
    // eslint-disable-next-line
  }, [page]);

  const typing = (e) => {
    setMessage(e.target.value);
  };

  function lastLink(set) {
    let value;
    for (value of set);
    return value;
  }

  const sendMessage = () => {
    if (/\S/.test(message.trim())) {
      const data = {
        sender: {
          id: user._id,
          model: user.role.trim().replace(/^\w/, (char) => char.toUpperCase()),
        },
        message: {
          text: message.trim(),
          link: lastLink(getUrls(message.trim()))
            ? lastLink(getUrls(message.trim()))
            : null,
        },
      };
      setMessage("");
      dispatch(
        userActions.appendMessage({
          chatroomId: active_chatroom._id,
          sender: data.sender,
          text: data.message.text,
          link: data.message.link,
          file: null,
          urlEmbeds: {
            title: null,
            description: null,
            image: null,
          },
          time: new Date(),
        })
      );
      socket.current.emit("toServer", data);
    }
  };

  return (
    <>
      {chatroomLoading && !active_chatroom ? (
        <Loader />
      ) : (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
          style={{ overflow: "hidden" }}
        >
          <Grid item className={classes.scrollDiv}>
            <Grid
              container
              direction="column-reverse"
              justify="center"
              alignItems="stretch"
              spacing={2}
            >
              <div ref={lastMessage}></div>
              {user_messages.length > 0 &&
                user_messages.map((item) => {
                  return <MessageItem message={item} id={user._id} />;
                })}
              <div ref={firstMessage}></div>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="filled"
                  value={message}
                  onChange={(event) => typing(event)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => sendMessage()}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MessageList;
