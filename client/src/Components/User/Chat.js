import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const Chat = () => {
  let socket = useRef();
  const ENDPOINT = "http://localhost:5000";
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [send, setSend] = useState("");

  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("join", id);

    socket.current.on("toClient", (message) => {
      console.log(message);
      setMessages((prev) => {
        return [...prev, message];
      });
    });
  }, []);

  const clickHandler = (e) => {
    const data = {
      sender: {
        id: "5fb6b2accbecb72838aece98",
        model: "Admin",
      },
      message: {
        text: send,
        link: "https://youtu.be/yP3-WxT2ABc",
      },
    };
    socket.current.emit("toServer", data);
  };

  return (
    <div>
      {messages.map((item) => {
        return <p>{item.text}</p>;
      })}
      <input value={send} onChange={(event) => setSend(event.target.value)} />
      <button onClick={(event) => clickHandler(event)}>Send</button>
    </div>
  );
};

export default Chat;
