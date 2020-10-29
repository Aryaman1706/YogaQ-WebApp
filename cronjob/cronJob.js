/*
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0(midnight) - 23(11 pm in night))
# │ │ ┌───────────── day of month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday;
# │ │ │ │ │                                       7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * *  command_to_execute


*/

const mongoose = require("mongoose");
const Message = require("../models/Message");

const main = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yogaApp", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    // let date = new Date();
    // date = new Date().setMonth(date.getMonth() - 2);
    // const deleted = await Message.remove({ time: { $lte: { date } } });
    // console.log(`${deleted.deletedCount} messages deleted`);
    const message = await Message.create({
      text: `Current date is ${new Date()}`,
      time: new Date(),
    });
    console.log(`Created new message\n${message}`);
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error\n", error);
  }
};
main();
