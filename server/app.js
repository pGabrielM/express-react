const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  }
});

const { Pool } = require('pg')

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'default',
  password: 'admin', //secret
  port: 5432,
})

const getUsersA = (_request, response) => {
  pool.query('SELECT * FROM person where first_name like $1', ['A%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUsersB = (_request, response) => {
  pool.query('SELECT * FROM person where first_name like $1', ['B%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUsersC = (_request, response) => {
  pool.query('SELECT * FROM person where first_name like $1', ['C%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.get("/usersA", getUsersA)
app.get("/usersB", getUsersB)
app.get("/usersC", getUsersC)

pool.connect((err, pool) => {
  if(err){
    console.log("Connection error", err)
  } else {
    console.log("Database connected");
    pool.query('LISTEN update_notification')
    pool.query('LISTEN insert_notification')

    io.on("connection", (socket) => {
      pool.on("notification", (msg) => {
        const userPayload = msg.payload
        const userChannel = msg.channel

        const userPayloadObj = JSON.parse(userPayload)
        const checkFirstName = userPayloadObj.first_name.substr(0, 1)

        const isUpdateChannel = userChannel == 'update_notification'
        const isInsertChannel = userChannel == 'insert_notification'

        if (isUpdateChannel) {
          if (checkFirstName == 'A') socket.emit("updateListUsers", '/usersA', 'A')
          
          if (checkFirstName == 'B') socket.emit("updateListUsers", '/usersB', 'B')
          
          if (checkFirstName == 'C') socket.emit("updateListUsers", '/usersC', 'C')
        }

        if (isInsertChannel) {
          if(checkFirstName == 'A') socket.emit("insertListUser", '/usersA', 'A');
         
          if(checkFirstName == 'B') socket.emit("insertListUser", '/usersB', 'B');
         
          if(checkFirstName == 'C') socket.emit("insertListUser", '/usersC', 'C');
        }

        console.log(userPayloadObj)
        console.log(userChannel)
        
        console.log(`User with id ${socket.id} changed a person with the letter ${checkFirstName}!`)
      });
    })
  }
})

server.listen(3000, () => {
  console.log("Server is running")
});