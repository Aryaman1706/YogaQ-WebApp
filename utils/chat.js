const socketIO = require("socket.io");
const getEmbeds = require("./getEmbeds");
const Message = require("../chatroom/models/message");
const Chatroom = require("../chatroom/models/chatroom");

const modifyLastAccess = ({ userRole, chatroomId }) => {
  console.log("Last access change");
  let update = {};
  if (userRole === "user") {
    update = {
      "lastOpened.user": new Date(),
    };
  } else {
    update = {
      "lastOpened.partner": new Date(),
    };
  }
  Chatroom.findByIdAndUpdate(chatroomId, update);
};

const chat = async (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("Connection ", socket.id);
    socket.on("join", ({ userRole, chatroomId }) => {
      console.log(userRole);
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          modifyLastAccess({ userRole, chatroomId });
          socket.leave(room);
          socket.removeAllListeners("toServer");
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
        Message.create(data);
      });
      socket.on("disconnect", () => {
        modifyLastAccess({ userRole, chatroomId });
        console.log("socket io disconnected");
      });
    });
  });
};
module.exports = chat;
