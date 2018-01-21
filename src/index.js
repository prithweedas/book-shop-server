require("dotenv").config();
import http from "http";
import app from "./app";

const port = process.env.PORT || 3000;

const server = http.createServer(app);
console.log(process.env.DATA);

server.listen(port);
