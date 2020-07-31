// installed node.js
// package.json
// Express
// Serve static file

const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at port 3000'));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'})); //for express to understand incoming json data

const coords = [];

app.post('/api', (req, res) => {
  console.log('i got a request');
  console.log(req.body);
  const data = req.body;
  coords.push(data)
  res.json({
    status: 'Sucess',
    latitude: data.lat,
    longitude: data.long
  });
  console.log(coords);
});