import React, { useState, useEffect, useRef, useCallback } from "react";
import { TextField, Grid, makeStyles, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { admin as adminActions } from "../../redux/actions/index";
import MessageItem from "./MessageItem";
import Loader from "../Common/Loader";
import getUrls from "get-urls";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  scrollDiv: {
    height: "calc(100vh - 140px)",
    overflowY: "auto",
  },
  chatInputContainer: {
    borderTop: "1px solid rgb(216, 216, 224)",
  },
  input: {
    borderRadius: 20,
  },
  chatFlexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const MessageList = ({ socket }) => {
  const classes = useStyles();

  // * Socket Setup
  useEffect(() => {
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
  const [top, setTop] = useState(false);

  const scroller = useRef();
  const observer = useRef();
  const lastMessage = useRef(null);
  const firstMessage = useCallback(
    (node) => {
      if (messageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !message_end) {
          setTop(true);
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
      // loadChatroom();
    }
    // eslint-disable-next-line
  }, [error]);

  // * Clear
  useEffect(() => {
    return () => {
      socket.current.removeAllListeners("toClient");
      // dispatch(
      //   adminActions.modifyLastAccess({
      //     id: active_chatroom._id,
      //     formData: { lastAccess: new Date() },
      //   })
      // );
    };
    // eslint-disable-next-line
  }, []);

  // * Scroll to bottom
  useEffect(() => {
    if (top) {
      scroller.current.scrollTop = scroller.current.scrollHeight - height;
      setTop(false);
    } else {
      lastMessage.current.scrollIntoView();
    }
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

  const enterSend = (e) => {
    console.log(e);
    if (e.code && /^enter$/i.test(e.code)) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (/\S/.test(message.trim())) {
      const data = {
        sender: {
          id: admin._id,
          model: admin.role.trim().replace(/^\w/, (char) => char.toUpperCase()),
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
      dispatch(adminActions.clearUnreadMessagesActive());
    }
  };

  const newMessageIndicator = () => {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <span
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "red",
              margin: "auto",
            }}
          />
          <p
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "1rem",
              whiteSpace: "nowrap",
            }}
          >
            Unread Messages
          </p>
          <span
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "red",
              margin: "auto",
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      {chatroomLoading && !active_chatroom ? (
        <Loader />
      ) : (
        <Grid
          container
          direction="row"
          justify="stretch"
          alignItems="flex-end"
          spacing={2}
          style={{ overflow: "hidden" }}
        >
          <Grid item xs={12} className={classes.scrollDiv} ref={scroller}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              spacing={2}
            >
              <div ref={firstMessage}></div>
              {admin_messages &&
                admin_messages
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    if (
                      active_chatroom.unreadMessages > 0 &&
                      admin_messages.length - index ===
                        active_chatroom.unreadMessages
                    ) {
                      return (
                        <>
                          {newMessageIndicator()}
                          <MessageItem message={item} id={admin._id} />
                        </>
                      );
                    }
                    return <MessageItem message={item} id={admin._id} />;
                  })}
              <div ref={lastMessage}></div>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.chatInputContainer}>
            <div className={classes.chatFlexContainer}>
              <div style={{ width: "95%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={`Message ${active_chatroom.partner.id.username} .  ..`}
                  value={message}
                  onChange={(event) => typing(event)}
                  onKeyDown={(event) => enterSend(event)}
                  InputProps={{ className: classes.input }}
                />
              </div>
              <div style={{ margin: "auto" }}>
                <IconButton
                  disabled={!/\S/.test(message.trim())}
                  onClick={() => sendMessage()}
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MessageList;
