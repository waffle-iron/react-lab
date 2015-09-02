var express = require('express');
var corser = require("corser");
var app = express();
app.use(corser.create());

app.get('/bom', function (req, res) {
  res.json(require('./bom.js'));
});
app.get('/nav', function (req, res) {
  res.json(require('./nav.js'));
});

app.listen(3001, 'localhost', function (err, result) {
  console.log(err ? err: 'Listening at localhost:3001');
});
