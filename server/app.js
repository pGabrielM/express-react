const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const db = require('./queries')

var cors = require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.get('/usersA', db.getUsersA)
app.get('/usersB', db.getUsersB)
app.get('/usersC', db.getUsersC)


app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})