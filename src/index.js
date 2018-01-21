require("dotenv").config();
import http from "http";
import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    if (err) throw new Error(err);
    process.exit(1);
  });
