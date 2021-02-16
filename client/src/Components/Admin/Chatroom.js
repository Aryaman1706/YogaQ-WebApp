import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";
import Loader from "../Loader";
import io from "socket.io-client";
import ChatroomWaiting from "../User/ChatroomWaiting";

const Chatroom = () => {
  const { chatroomLoading, active_chatroom } = useSelector(
    (state) => state.admin
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
    if (!chatroomLoading) {
      return active_chatroom ? (
        <MessageList socket={socket} />
      ) : (
        <ChatroomWaiting type={"admin"} />
      );
    }
  };

  return <>{render()}</>;
};

export default Chatroom;
