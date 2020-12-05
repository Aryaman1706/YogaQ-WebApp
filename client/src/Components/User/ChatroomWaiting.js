import React from "react";
import ChatroomAnimation from "./ChatroomAnimation";

const ChatroomWaiting = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <h1>No Open Chatroom</h1>
      <ChatroomAnimation />
    </div>
  );
};

export default ChatroomWaiting;
