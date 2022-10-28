const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")

const db = require("./queries")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  }
});

app.get("/usersA", db.getUsersA)
app.get("/usersB", db.getUsersB)
app.get("/usersC", db.getUsersC)

io.on("connection", (socket) => {
  console.log(`User is connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data)
  })
})

server.listen(3000, () => {
  console.log("Server is running")
});