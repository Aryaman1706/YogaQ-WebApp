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
    console.log("Connection ", socket.id);
    socket.on("join", (chatroomId) => {
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          console.log("I will call modify last access.");
          socket.leave(room);
        }
      });
      socket.join(chatroomId);
      console.log("joined!");
      console.log(socket.rooms);
      socket.on("toServer", async ({ sender, message }) => {
        console.log("Message Recieved");
        const data = {
          chatroomId,
          sender,
          text: message.text,
          link: message.link ? message.link : null,
          urlEmbeds: {
            title: null,
            description: null,
            image: null,
          },
          time: new Date(),
        };
        if (message.link) {
          const embeds = await getEmbeds(message.link);
          console.log(embeds);
          data.urlEmbeds = embeds;
        }
        socket.to(chatroomId).emit("toClient", data);
        console.log("Message sent");
        await Message.create(data);
      });
    });

    socket.on("disconnect", () => {
      console.log("socket io disconnected");
    });
  });
};
module.exports = chat;
