/* eslint-disable no-console */

import mongoose from "mongoose";

import constants from "./constants";

mongoose.Promise = global.Promise;

mongoose.set("debug", true); // debug mode on

if (process.env.NODE_ENV === "production") {
  try {
    mongoose.connect(constants.MONGO_URI);
    console.log("Connected to Cloud Mongo");
  } catch (err) {
    mongoose.createConnection(constants.MONGO_URI);
    console.log("Connected to Cloud Mongo");
  }
} else {
  mongoose.connect(constants.DB_URL);
  console.log("Connected to Local Mongo");
}

mongoose.connection
  .once("open", () => console.log("MongoDB Running"))
  .on("error", e => {
    throw e;
  });
