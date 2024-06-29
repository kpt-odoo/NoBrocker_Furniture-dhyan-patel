const mongoose = require("mongoose");

const connect = () =>
  mongoose.connect(
    "mongodb+srv://parthivsinhv:parthiv@cluster0.oq5seik.mongodb.net/"
  );

module.exports = connect;
