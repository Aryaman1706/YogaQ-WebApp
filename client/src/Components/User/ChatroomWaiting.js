import React from "react";
import ChatroomAnimation from "./ChatroomAnimation";

const ChatroomWaiting = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        // height: "70vh",
      }}
    >
      <h1>No Open Chatroom</h1>
      <ChatroomAnimation />
    </div>
  );
};

export default ChatroomWaiting;
