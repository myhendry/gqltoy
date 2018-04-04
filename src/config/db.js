/* eslint-disable no-console */

import mongoose from "mongoose";

import constants from "./constants";

mongoose.Promise = global.Promise;

mongoose.set("debug", true); // debug mode on

try {
  if (process.env.NODE_ENV === "production") {
    mongoose.connect(constants.MONGO_URI);
  }
  mongoose.connect(constants.DB_URL);
} catch (err) {
  mongoose.createConnection(constants.DB_URL);
}

mongoose.connection
  .once("open", () => console.log("MongoDB Running"))
  .on("error", e => {
    throw e;
  });
