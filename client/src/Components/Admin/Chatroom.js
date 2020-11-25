import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";
import Loader from "../Loader";

const Chatroom = () => {
  const { chatroomLoading, active_chatroom } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    console.log("Loaded Chatroom");
  }, []);

  const render = () => {
    if (chatroomLoading) {
      return <Loader />;
    }
    if (!chatroomLoading && !active_chatroom) {
      return <h1>No Open Chatroom</h1>;
    }
    if (active_chatroom && !chatroomLoading) {
      return <MessageList />;
    }
  };

  return <>{render()}</>;
};

export default Chatroom;
