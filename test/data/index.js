var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.json(require('./load.js'));
});

app.listen(3001, 'localhost', function (err, result) {
  console.log(err ? err: 'Listening at localhost:3001');
});
