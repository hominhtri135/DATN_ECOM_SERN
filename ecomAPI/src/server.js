require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const initwebRoutes = require("./route/web");
const { sendMessage } = require("./services/messageService");
const viewEngine = require("./config/viewEngine");

const connectDB = require("./config/connectDB");
connectDB();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const app = express();

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initwebRoutes(app);

const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    sendMessage(data);
    socketIo.emit("sendDataServer", { data });
  });
  socket.on("loadRoomClient", function (data) {
    socketIo.emit("loadRoomServer", { data });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Backend Nodejs is running on the port : " + port);
});
