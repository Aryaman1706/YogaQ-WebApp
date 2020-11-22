const socketIO = require("socket.io");
const getEmbeds = require("./getEmbeds");
const Message = require("../models/Message");

const chat = async (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join", (chatroomId) => {
      socket.join(chatroomId);
      console.log("joined!");
      socket.on("toServer", async ({ sender, message }) => {
        console.log("Message Recieved");
        let embeds = {
          title: null,
          description: null,
          image: null,
        };
        if (message.link) {
          embeds = await getEmbeds(message.link);
          console.log(embeds);
        }
        const newMessage = await Message.create({
          chatroomId,
          sender,
          text: message.text,
          link: message.link ? message.link : null,
          urlEmbeds: embeds,
        });
        socket.to(chatroomId).emit("toClient", newMessage);
        console.log("Message sent");
      });
    });

    socket.on("disconnect", () => {
      console.log("socket io disconnected");
    });
  });
};
module.exports = chat;
