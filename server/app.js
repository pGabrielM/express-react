const express = require('express')
const app = express()
const port = 3000

const db = require('./queries')

app.get('/usersA', db.getUsersA)
app.get('/usersB', db.getUsersB)
app.get('/usersC', db.getUsersC)


app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})