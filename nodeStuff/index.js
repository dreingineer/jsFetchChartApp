// installed node.js
// package.json
// Express
// Serve static file

const express = require('express');
const app = express();

app.listen(3000, () => console.log('listening at port 3000'));

app.use(express.static('public'));