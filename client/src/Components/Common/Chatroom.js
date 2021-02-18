import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageList from "../Admin/MessageList";
import Loader from "./Loader";
import io from "socket.io-client";
import ChatroomWaiting from "../Common/ChatroomWaiting";

const Chatroom = ({ type }) => {
  const { chatroomLoading, active_chatroom } = useSelector((state) => {
    if (type.trim() === "admin") return state.admin;
    else if (type.trim() === "user") return state.user;
  });

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
        <h1>{active_chatroom._id}</h1>
      ) : (
        // <MessageList socket={socket} />
        <ChatroomWaiting type={type.trim()} />
      );
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
