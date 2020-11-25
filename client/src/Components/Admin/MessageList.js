import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField, Grid, makeStyles, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { admin as adminActions } from "../../redux/actions/index";
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
  const ENDPOINT = process.env.REACT_APP_SERVER_URL;
  const socket = useRef();
  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", active_chatroom._id);

    socket.current.on("toClient", (message) => {
      dispatch(adminActions.appendMessage(message));
    });
    // eslint-disable-next-line
  }, []);

  const {
    admin_messages,
    message_end,
    active_chatroom,
    admin,
    error,
    chatroomLoading,
  } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [messageLoading, setMessageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [height, setHeight] = useState(null);

  const scroller = useRef();
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
    await dispatch(adminActions.setChatroomLoading(true));
    await dispatch(adminActions.getChatroom(active_chatroom._id));
    await dispatch(adminActions.setChatroomLoading(false));
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
        adminActions.modfiyLastAccess({
          id: active_chatroom._id,
          formData: { lastAccess: new Date() },
        })
      );
    };
    // eslint-disable-next-line
  }, []);

  // * Scroll to bottom
  useEffect(() => {
    scroller.current.scrollTop = scroller.current.scrollHeight - height;
    // lastMessage.current && lastMessage.current.scrollIntoView();
    // eslint-disable-next-line
  }, [admin_messages]);

  // * Load More Messages
  const nextHandler = () => {
    setHeight(scroller.current.scrollHeight);
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
        adminActions.getMessages({ id: active_chatroom._id, page })
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
          id: admin._id,
          model: "Admin",
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
        adminActions.appendMessage({
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
          <Grid item className={classes.scrollDiv} ref={scroller}>
            <Grid
              container
              direction="column-reverse"
              justify="center"
              alignItems="stretch"
              spacing={2}
            >
              <div ref={lastMessage}></div>
              {admin_messages.length > 0 &&
                admin_messages.map((item) => {
                  return <MessageItem message={item} id={admin._id} />;
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
