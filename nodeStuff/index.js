// installed node.js
// package.json
// Express
// Serve static file

const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log('listening at port 3000'));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'})); //for express to understand incoming json data

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if(err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.post('/api', (req, res) => {
  console.log('i got a request');
  const data = req.body;
  const timestamp = new Date(Date.now());
  data.timestamp = timestamp.toString();
  database.insert(data);
  res.json(data);
});