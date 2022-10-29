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
  pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['A%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUsersB = (_request, response) => {
  pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['B%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUsersC = (_request, response) => {
  pool.query('SELECT * FROM person where first_name like $1 LIMIT 10', ['C%'], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.get("/usersA", getUsersA)
app.get("/usersB", getUsersB)
app.get("/usersC", getUsersC)

io.on("connection", (socket) => {

  pool.connect((err, pool) => {
    if(err){
      console.log("Connection error", err)
    } else {
      console.log("Database connected");
      pool.on("notification", (msg) => {
        const message = JSON.parse(msg.payload)
        const checkFirstName = message.first_name.substr(0, 1)

        if (checkFirstName == 'A') {
          socket.emit("updateListUsersA", '/usersA', 'A')
        }
        if (checkFirstName == 'B') {
          socket.emit("updateListUsersA", '/usersB', 'B')
        }
        if (checkFirstName == 'C') {
          socket.emit("updateListUsersA", '/usersC', 'C')
        }
        console.log(`User with id ${socket.id} changed a person with the letter ${checkFirstName}!`)
        
      });
      pool.query('LISTEN update_notification')
    }
  })

  
})

server.listen(3000, () => {
  console.log("Server is running")
});