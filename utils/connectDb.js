const mongoose = require("mongoose");

module.exports = (mongoConnectionUri) => {
  mongoose.connect(
    mongoConnectionUri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log("Connection to MongoDB failed.\n", err);
      console.log("Connected to MongoDB");
    }
  );

  return mongoose.connection;
};
