import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";
import Loader from "../Loader";
import io from "socket.io-client";
import ChatroomWaiting from "./ChatroomWaiting";

const Chatroom = () => {
  const { chatroomLoading, active_chatroom } = useSelector(
    (state) => state.user
  );

  // * Socket Setup
  const ENDPOINT = process.env.REACT_APP_SERVER_URL;
  const socket = useRef();

  useEffect(() => {
    socket.current = io(ENDPOINT);
    // eslint-disable-next-line
  }, []);

  const render = () => {
    if (chatroomLoading) {
      return <Loader />;
    }

    if (!chatroomLoading && !active_chatroom) {
      return <ChatroomWaiting type={"user"} />;
    }
    if (active_chatroom && !chatroomLoading) {
      return <MessageList socket={socket} />;
    }
  };

  return (
    <>
      {socket.current && socket.current.connected ? (
        render()
      ) : (
        <h1>Connecting...</h1>
      )}
    </>
  );
};

export default Chatroom;
