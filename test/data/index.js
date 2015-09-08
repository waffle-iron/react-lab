var app = require('connect')();
// app.use(require('connect-livereload')());
app.use(require('corser').create());

function sendJSON(res, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

['/bom', '/nav']
.forEach(function(uri) {
  app.use(uri, function(req, res) {
    sendJSON(res, require('.' + uri));
  });
});

app.use('/mst', function(req, res) {
  sendJSON(res, {
    specs: require('./specs'),
    materials: require('./materials'),
    material_attrs: require('./material_attrs')
  });
});

var port = 3001;
app.listen(port, function() {
  console.log('Serving at http://localhost:%s', port);
});
